from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TrackUploadSerializer, TrackUpdateSerializer
from .models import Track


class TrackUploadView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = TrackUploadSerializer

    def post(self, request):        
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            track = serializer.save()

            response = {
                "success": True,
                "status_code": status.HTTP_200_OK,
                "message": "Трек успешно загружен",
                "payload": {
                  "track_id": track.id
                }
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrackUpdateView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = TrackUpdateSerializer

    def post(self, request):
        instance = Track.objects.get(pk=request.data['id'])        
        serializer = self.get_serializer(instance, data=request.data)
        
        if serializer.is_valid():
            track = serializer.save()

            response = {
                "success": True,
                "status_code": status.HTTP_200_OK,
                "message": "Трек успешно изменён",
                "payload": {
                    "track_id": track.id,
                    "user_id": track.user_id,
                    "title": track.title,
                }
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
