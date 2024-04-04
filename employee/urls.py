from django.urls import path
from . import views

urlpatterns = [
    path('portal/', views.portal, name="portal"),
    path('authEmployee/', views.authenticateEmployee, name='authEmployee'),
    path('employee/', views.employee, name='employee'),
]