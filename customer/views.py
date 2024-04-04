from django.shortcuts import render, redirect
from manage_customer.models import Customer
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.hashers import check_password
from django.urls import reverse
from .forms import CustomerForm
import json

def home(request):
    if "employee_id" in request.session:
        return redirect('/employee')

    if "customer_id" in request.session:
        context = {"customerLoggedIn": True}
    else:
        context = {"customerLoggedIn": False}
        
    return render(request, 'index.html', context)

def signup(request):
    if "employee_id" in request.session:
        return redirect('/employee')

    if "customer_id" in request.session:
        return HttpResponseRedirect(reverse('index'))
    else:
        context = {"customerLoggedIn": False}

    if request.method == "POST":
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()

            try:
                email = form.cleaned_data['email']
                customerFound = Customer.objects.get(email=email)
                
                if(customerFound):
                    request.session["customer_id"] = customerFound.id
                    return HttpResponseRedirect(reverse('index'))
             
                return render(request, 'pages/signup.html', context)
            except Customer.DoesNotExist:
                return render(request, 'pages/signup.html', context)

    return render(request, 'pages/signup.html', context)

def verifyEmail(request):
    is_fetch = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_fetch:
        if request.method == 'POST':
            try:
                data = json.loads(request.body)
                email = data.get('email')

                customerFound = Customer.objects.get(email=email)
                
                if(customerFound):
                    return JsonResponse({"success": False, 'errorMsg': "Email já cadastrado"})
             
                return JsonResponse({"success": False, 'errorMsg': "Erro na verificação"})
            except Customer.DoesNotExist:
                return JsonResponse({"success": True, 'errorMsg': ""})
    else:
        return HttpResponseRedirect(reverse('index'))
    
def authenticateCustomer(request):
    is_fetch = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_fetch:
        if request.method == 'POST':
            try:
                data = json.loads(request.body)
                email = data.get('email')
                password = data.get('password')

                customerFound = Customer.objects.get(email=email)
                
                if check_password(password, customerFound.password):
                    request.session["customer_id"] = customerFound.id
                    return JsonResponse({"success": True, 'errorMsg': ""})
                else:
                    return JsonResponse({"success": False, 'errorMsg': "Email ou senha incorreto"})
            except Customer.DoesNotExist:
                return JsonResponse({"success": False, 'errorMsg': "Este usuário não existe!"})
    else:
        return HttpResponseRedirect(reverse('index'))
    
def logout(request):
    if "customer_id" in request.session:
        del request.session["customer_id"]

    if "employee_id" in request.session:
        del request.session["employee_id"]

    if "employee_name" in request.session:
        del request.session["employee_name"]

    if "employee_access-level" in request.session:
        del request.session["employee_access_level"]

    return HttpResponseRedirect(reverse("index"))


            


    


