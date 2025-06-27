from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReconciliationSerializer
from django.shortcuts import render
import csv



def home(request):
    return render(request, 'index.html')

    
class reconciliation(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = ReconciliationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        internal_file = serializer.validated_data['internal_file']
        provider_file = serializer.validated_data['provider_file']

        transaction_data = self.parse_csv(internal_file)
        provider_data = self.parse_csv(provider_file)

        answer = self.compare_datasets(transaction_data, provider_data)

        return Response(answer)

    def parse_csv(self, file):
        decoded_file = file.read().decode('utf-8').splitlines()
        return list(csv.reader(decoded_file))

    def compare_datasets(self, internal_data, provider_data):
        internal_headers = internal_data[0]
        provider_headers = provider_data[0]

        internal_transactions = {}
        for row in internal_data[1:]:
            if len(row) < 4:
                continue
            transaction_ref = row[0]
            internal_transactions[transaction_ref] = {
                'amount (KSH)': row[1],
                'status': row[2],
                'time stamps': row[3]
            }

        provider_transactions = {}
        for row in provider_data[1:]:
            if len(row) < 4:
                continue
            transaction_ref = row[0]
            provider_transactions[transaction_ref] = {
                'amount (KSH)': row[1],
                'status': row[2],
                'time stamps': row[3]
            }

        matched = {}
        only_internal = {}
        only_provider = {}
        mismatches = {}

        for ref, data in internal_transactions.items():
            if ref in provider_transactions:
                provider_data = provider_transactions[ref]
                if data != provider_data:
                    mismatches[ref] = {
                        'internal_amount': data['amount (KSH)'],
                        'provider_amount': provider_data['amount (KSH)'],
                        'internal_status': data['status'],
                        'provider_status': provider_data['status']
                    }
                else:
                    matched[ref] = data
            else:
                only_internal[ref] = data

        for ref, data in provider_transactions.items():
            if ref not in internal_transactions:
                only_provider[ref] = data

        return {
            'matched': matched,
            'only_internal': only_internal,
            'only_provider': only_provider,
            'mismatches': mismatches
        }