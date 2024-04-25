from django.db import models
from django.contrib.auth.hashers import make_password

class Customer(models.Model):
    name = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=13, null=False)
    email = models.EmailField(max_length=100, null=False, unique=True)
    password = models.CharField(max_length=200)
    
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(Customer, self).save(*args, **kwargs)
        