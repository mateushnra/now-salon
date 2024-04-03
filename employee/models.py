from django.db import models

ACCESS_LEVEL_CHOICES=(
    ('1','Admin'),
    ('2', 'Manager'),
    ('3','Employee'),
)

class Employee(models.Model):
    name = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=13, null=False)
    role = models.CharField(max_length=30, null=False)
    accessLevel = models.CharField(max_length=8, null=False,choices=ACCESS_LEVEL_CHOICES, default=3)
    password = models.CharField(max_length=200, null=False)
    
    def __str__(self):
        return self.name