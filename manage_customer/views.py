from django.shortcuts import render, redirect
from .models import Customer
from .forms import CustomerForm

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
        print(customers)
        searchedOption = request.GET.get('searchButton')
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
                    
        elif (searchedOption and searchedOption == "searchFilteredValue"):

            filterOption = request.GET.get('filterOption')
            searchedValue = request.GET.get('filterValue')

            match filterOption:
                case "name":
                    customers = customers.filter(name__icontains=searchedValue)
                case "email":
                    customers = customers.filter(email__icontains=searchedValue)
                case "phone":
                   customers = customers.filter(phone__icontains=searchedValue)
            
        context["customers"] = customers
        context["filterOption"] = filterOption
        
    else:
        return redirect('/')
        
    return render(request, 'pages/customer.html', context)

# def service_register(request):
#     if "customer_id" in request.session:
#         return redirect('/')
#     else:
#         context = {"customerLoggedIn": False}

#     if "employee_id" in request.session and request.session["employee_access_level"] == "1":
#         context = {
#                     "employeeLoggedIn": True,
#                     "employeeAccessLevel": request.session["employee_access_level"],
#                     "employeeName": request.session["employee_name"],
#                     "serviceCreated": False,
#         }

#         if request.method == "POST":
#             form = ServiceForm(request.POST)

#             if form.is_valid():
#                 form.save()

#                 context["serviceCreated"] = True
#     else:
#         return redirect('/')
        
#     return render(request, 'pages/service_register.html', context)

def customer_edit(request, pk):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        if request.method == "POST":
           
            updateCustomer = Customer.objects.get(id=pk)
            updateCustomer.name = request.POST.get("name")
            updateCustomer.email = request.POST.get("email")
            updateCustomer.phone = request.POST.get("phone")
            
            if request.POST.get("password") != '':
                updateCustomer.password = request.POST.get("password")
                
            updateCustomer.save()
                
            # form = CustomerForm(instance=updateCustomer)
            # print(form)
            # form = CustomerForm(instance=updateCustomer, data=request.POST)
            # print(form)
            # if form.is_valid():
            #     form.save()
            #     return redirect('/employee/customer')

        try:
            customerSelected = Customer.objects.get(id=pk)

            if customerSelected:
                context = {
                    "employeeLoggedIn": True,
                    "employeeAccessLevel": request.session["employee_access_level"],
                    "employeeName": request.session["employee_name"],
                    "customerSelected": customerSelected,
                }
            else:
                return redirect('/employee/service')
        except Customer.DoesNotExist:
            return redirect('/employee/service')
    return render(request, 'pages/customer_edit.html', context)