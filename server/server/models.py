from django.db import models

class tbl_district(models.Model):
    district_name = models.CharField(max_length=60)

class tbl_category(models.Model):
    category_name = models.CharField(max_length=100)

class tbl_admin(models.Model):
    admin_name = models.CharField(max_length=50)
    admin_email = models.EmailField(unique=True)
    admin_password = models.CharField(max_length=20)

class tbl_place(models.Model):
    place_name = models.CharField(max_length=50)
    district = models.ForeignKey(tbl_district,on_delete=models.CASCADE)

class tbl_subcategory(models.Model):
    subcategory_name = models.CharField(max_length=50)
    category = models.ForeignKey(tbl_category,on_delete=models.CASCADE)

class tbl_type(models.Model):
    type_name = models.CharField(max_length=100)

class tbl_subtype(models.Model):
    subtype_name = models.CharField(max_length=50)
    type = models.ForeignKey(tbl_type,on_delete=models.CASCADE)

class tbl_user(models.Model):
    user_name = models.CharField(max_length=60)
    user_email = models.EmailField(unique=True)
    user_password = models.CharField(max_length=30)
    user_photo = models.FileField(upload_to='Assets/UserPhoto/')
    user_proof = models.FileField(upload_to='Assets/UserProofs/')
    place_id = models.ForeignKey(tbl_place,on_delete=models.CASCADE)

class tbl_level(models.Model):
    level_name = models.CharField(max_length=60)


class tbl_lawyer(models.Model):
    lawyer_name= models.CharField(max_length=60)
    lawyer_email = models.EmailField(unique=True)
    lawyer_password = models.CharField(max_length=30)
    lawyer_photo = models.FileField(upload_to="Assets/LawyerPhoto/")
    lawyer_proof = models.FileField(upload_to="Assets/LawyerProof/")
    lawyer_address = models.CharField(max_length=70)
    lawyer_status = models.CharField(max_length=10)
    lawyer_qualification = models.CharField(max_length=100)
    place_id = models.ForeignKey(tbl_place,on_delete=models.CASCADE)
    categories = models.ManyToManyField(tbl_category, blank=True)  


class tbl_request(models.Model):
    request_file = models.FileField(upload_to="Assets/RequestFile/")
    request_status = models.CharField(max_length=10)
    mode_status = models.CharField(max_length=10,null=True,default=1)
    request_date = models.CharField(max_length=30)
    request_type = models.CharField(max_length=10)
    request_fee = models.CharField(max_length=10)
    user_id = models.ForeignKey(tbl_user, on_delete=models.CASCADE,null=True)
    level_id = models.ForeignKey(tbl_level, on_delete=models.CASCADE,null=True)
    type_id = models.ForeignKey(tbl_type, on_delete=models.CASCADE,null=True)
    lawyer_id = models.ForeignKey(tbl_lawyer, on_delete=models.CASCADE,null=True)

class tbl_requestreport(models.Model):
    requestreport_file = models.FileField(upload_to="Assets/RequestreportFile/")
    requestreport_details = models.CharField(max_length=200)
    request_id = models.ForeignKey(
        tbl_request,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
class tbl_requestfee(models.Model):
    requestfee_amount = models.CharField(max_length=50)
    requestfee_details = models.CharField(max_length=100)
    request_status = models.IntegerField(default=0)   
    request_id = models.ForeignKey(tbl_request, on_delete=models.CASCADE, null=True)



class tbl_complaint(models.Model):
    complaint_title = models.CharField(max_length=50)
    complaint_content = models.CharField(max_length=100)
    complaint_reply = models.CharField(max_length=50, blank=True, null=True)
    complaint_status = models.CharField(max_length=50, default="0")
    user_id = models.ForeignKey(tbl_user, on_delete=models.CASCADE, null=True)

class tbl_rating(models.Model):
    rating_count = models.IntegerField(null=True)
    rating_comment=models.CharField(max_length=50)
    user_id=models.ForeignKey(tbl_user,on_delete=models.CASCADE,null=True)



class tbl_plan(models.Model):
    plan_name = models.CharField(max_length=50)
    plan_duration = models.IntegerField()  
    plan_price = models.IntegerField(null=True)

class tbl_planpurchase(models.Model):
    user = models.ForeignKey(tbl_user, on_delete=models.CASCADE)
    plan = models.ForeignKey(tbl_plan, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.IntegerField(default=0)  # 0 = pending, 1 = paid

class tbl_subscription(models.Model):
    subscription_startdate = models.DateField()
    subscription_enddate = models.DateField()
    user_id = models.ForeignKey(tbl_user, on_delete=models.CASCADE,null=True)
    plan_id = models.ForeignKey(tbl_plan, on_delete=models.CASCADE,null=True)

class tbl_lawyercategory(models.Model):
    category_id=models.ForeignKey(tbl_category,on_delete=models.CASCADE,null=True)
    lawyer_id=models.ForeignKey(tbl_lawyer,on_delete=models.CASCADE,null=True)


class tbl_schedule(models.Model):
    request_id = models.ForeignKey(tbl_request, on_delete=models.CASCADE)
    schedule_date = models.DateField()
    schedule_time = models.TimeField()
    schedule_venue = models.CharField(max_length=255, null=True, blank=True)
    schedule_link = models.CharField(max_length=255, null=True, blank=True)
    schedule_status = models.IntegerField(default=0)
