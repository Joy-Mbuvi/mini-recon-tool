from rest_framework import serializers


class Reconserializer(serializers.Serializer):
    internal_file=serializers.FileField()
    provider_file=serializers.FileField()