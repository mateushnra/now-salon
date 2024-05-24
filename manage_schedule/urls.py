from django.urls import path
from . import views

urlpatterns = [
    path('employee/schedule', views.schedule_list, name='schedule_list'),
    path('employee/schedule/selectcustomer', views.schedule_select_customer, name='schedule_select_customer'),
    path('employee/schedule/register/<int:fkcustomer>', views.schedule_register, name='schedule_register'),
    path('employee/schedule/edit/<int:pk>', views.schedule_edit, name='schedule_edit'),
]