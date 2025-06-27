from django.urls import path
from .views import reconciliation  


urlpatterns = [
    path('', views.home, name='home'),

    path('api/reconcile/', reconciliation.as_view(), name='reconciliation'),
]