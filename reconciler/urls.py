from django.urls import path
from .views import reconciliation, home  

urlpatterns = [
    path('', home, name='home'),  
    path('api/reconcile/', reconciliation.as_view(), name='reconciliation'),
]