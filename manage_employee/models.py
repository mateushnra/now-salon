from django.db import models
from django.contrib.auth.hashers import make_password

ACCESS_LEVEL_CHOICES=(
    ('1', 'Manager'),
    ('2','Employee'),
)

class Employee(models.Model):
    name = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=13, null=False)
    role = models.CharField(max_length=30, null=False)
    accessLevel = models.CharField(max_length=8, null=False,choices=ACCESS_LEVEL_CHOICES, default=2)
    password = models.CharField(max_length=200, null=False)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(Employee, self).save(*args, **kwargs)
    
class EmployeeHasServices(models.Model):
    idEmployee = models.ForeignKey(
        "manage_employee.Employee",
        on_delete=models.PROTECT,
    )
    idService = models.ForeignKey(
        "manage_service.Service",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return 'Employee: ' + self.idEmployee + ' - Service: ' + self.idService