from rest_framework import serializers


class Reconserializer(serilizers.Serializer):
    internal_file=serializer.Filefield()
    providers_file=serializers.Filefield()