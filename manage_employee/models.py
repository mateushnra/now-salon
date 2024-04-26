from django.db import models
from django.contrib.auth.hashers import make_password
from manage_service.models import Service

ACCESS_LEVEL_CHOICES=(
    ('1', 'Gerente'),
    ('2','Funcionario'),
)

class Employee(models.Model):
    name = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=13, null=False)
    role = models.CharField(max_length=30, null=False)
    accessLevel = models.CharField(max_length=8, null=False,choices = ACCESS_LEVEL_CHOICES, default=2)
    password = models.CharField(max_length=200, null=False)
    service = models.ManyToManyField(Service, blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(Employee, self).save(*args, **kwargs)