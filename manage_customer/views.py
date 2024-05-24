from django.shortcuts import render, redirect
from .models import Customer
from .forms import CustomerForm
from django.core.paginator import Paginator

def customer(request):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        context = {
            "employeeLoggedIn": True,
            "employeeAccessLevel": request.session["employee_access_level"],
            "employeeName": request.session["employee_name"],
            "anyItemWasDeleted": False
        }

        customers = Customer.objects.all()

        filterOption = request.GET.get('filterOption')
        searchedValue = request.GET.get('filterValue')

        if(filterOption == None):
            filterOption = "Default"

        if request.method == "POST":
            actionCustomerSelected = request.POST.get('actionButton')
            idItemSelected = request.POST.get('selectedId')
            match actionCustomerSelected:
                case "edit":
                    return redirect(f'/employee/customer/edit/{idItemSelected}')
                case "delete":
                    customerToDelete = Customer.objects.get(id=idItemSelected)
                    customerToDelete.delete()

                    context["anyItemWasDeleted"] = True
                    
        elif (filterOption):
            match filterOption:
                case "name":
                    customers = customers.filter(name__icontains=searchedValue)
                case "email":
                    customers = customers.filter(email__icontains=searchedValue)
                case "phone":
                   customers = customers.filter(phone__icontains=searchedValue)
            
        paginator = Paginator(customers, 2)
        page = request.GET.get('page')
        customers = paginator.get_page(page)

        context["customers"] = customers
        context["searchedValue"] = searchedValue
        context["filterOption"] = filterOption
        
    else:
        return redirect('/')
        
    return render(request, 'pages/customer.html', context)

def customer_register(request):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        context = {
            "employeeLoggedIn": True,
            "employeeAccessLevel": request.session["employee_access_level"],
            "employeeName": request.session["employee_name"],
            "customerCreated": False,
        }

        if request.method == "POST":
            form = CustomerForm(request.POST)

            if form.is_valid():
                form.save()
                context["customerCreated"] = True

    else:
        return redirect('/')
        
    return render(request, 'pages/customer_register.html', context)

def customer_edit(request, pk):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        context = {
            "employeeLoggedIn": True,
            "employeeAccessLevel": request.session["employee_access_level"],
            "employeeName": request.session["employee_name"],
            "emailAlreadyExists": False
        }
        
        if request.method == "POST":
            try:    
                customerBeingEdit = Customer.objects.get(id=pk)
                EmailAlreadyExists = Customer.objects.get(email=request.POST.get("email"))

                if EmailAlreadyExists and EmailAlreadyExists.email != customerBeingEdit.email: 
                    context["emailAlreadyExists"] = True
                else:
                    updateCustomer = Customer.objects.get(id=pk)
                    updateCustomer.name = request.POST.get("name")
                    updateCustomer.email = request.POST.get("email")
                    updateCustomer.phone = request.POST.get("phone")

                    if request.POST.get("password") != '':
                        updateCustomer.password = request.POST.get("password")

                        updateCustomer.save(update_fields=["name", "email", "phone", "password"])
                    else:
                        updateCustomer.save(update_fields=["name", "email", "phone"])
                        
                    return redirect('/employee/customer')
            except Customer.DoesNotExist:
                updateCustomer = Customer.objects.get(id=pk)
                updateCustomer.name = request.POST.get("name")
                updateCustomer.email = request.POST.get("email")
                updateCustomer.phone = request.POST.get("phone")
                
                if request.POST.get("password") != '':
                    updateCustomer.password = request.POST.get("password")

                    updateCustomer.save(update_fields=["name", "email", "phone", "password"])
                else:
                    updateCustomer.save(update_fields=["name", "email", "phone"])
                    
                return redirect('/employee/customer')
            
        try:
            customerSelected = Customer.objects.get(id=pk)

            if customerSelected:
                context["customerSelected"] = customerSelected
            else:
                return redirect('/employee/service')
        except Customer.DoesNotExist:
            return redirect('/employee/service')
    return render(request, 'pages/customer_edit.html', context)