from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=13, null=False)
    email = models.EmailField(max_length=100, null=False, unique=True)
    password = models.CharField(max_length=200, null=False)
    
    def __str__(self):
        return self.email