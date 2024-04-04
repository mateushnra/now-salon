from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="index"),
    path('signup/', views.signup, name="signup"),
    path('verifyEmail/', views.verifyEmail, name='verifyEmail'),
    path('authCustomer/', views.authenticateCustomer, name='authCustomer'),
    path('logout/', views.logout, name='logout'),
]