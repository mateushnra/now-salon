from django.shortcuts import render, redirect
from .models import Salon
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
import json

def salon(request, pk):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        
        try:
            salon = Salon.objects.get(id=pk)

            if salon:
                context = {
                    "employeeLoggedIn": True,
                    "employeeAccessLevel": request.session["employee_access_level"],
                    "employeeName": request.session["employee_name"],
                    "salonData": salon,
                }
            else:
                return redirect('/')
        except Salon.DoesNotExist:
            return redirect('/')
    else:
        return redirect('/')
        
    return render(request, 'pages/salon.html', context)
