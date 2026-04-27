from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from server.models import *
import json
from django.db.models import Sum, Q
from django.utils import timezone




@csrf_exempt
def District(request):
    district = list(tbl_district.objects.values()) #select
    if request.method == "POST": #insert
        data = json.loads(request.body)
        tbl_district.objects.create(district_name=data['name'])
        return JsonResponse({'msg':"Data Inserted.."})
    return JsonResponse({"data":district})

@csrf_exempt
def deletedistrict(request, did):#delete
    tbl_district.objects.get(id=did).delete()
    return JsonResponse({'msg':"Data Deleted.."})

@csrf_exempt
def editdistrict(request,eid):
    editdata = tbl_district.objects.get(id=eid)
    if request.method == "PUT":
        data = json.loads(request.body)
        editdata.district_name = data['name']
        editdata.save()
        return JsonResponse({'msg':"Data Updated.."})
    return JsonResponse({"district_name":editdata.district_name,'district_id':editdata.id})







@csrf_exempt
def Category(request):
    if request.method == "POST":
        # Insert new category
        try:
            data = json.loads(request.body)
            tbl_category.objects.create(category_name=data['category'])
            return JsonResponse({"msg": "Data inserted successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    # GET all categories
    categories = list(tbl_category.objects.values("id", "category_name"))
    return JsonResponse({"categories": categories}, status=200)


@csrf_exempt
def deletecategory(request,did):
    tbl_category.objects.get(id=did).delete()
    return JsonResponse({'msg':"Data Deleted..."})

@csrf_exempt
def editcategory(request,eid):
    editdata = tbl_category.objects.get(id=eid)
    if request.method == "PUT":
        data = json.loads(request.body)
        editdata.category_name = data['category']
        editdata.save()
        return JsonResponse({'msg':"Data Updated.."})
    return JsonResponse({"category_name":editdata.category_name,'category_id':editdata.id})







@csrf_exempt
def Admin(request):
    admindata = list(
        tbl_admin.objects.values(
            'id',
            'admin_name',
            'admin_email',
            'admin_password'
        )
    )
    if request.method == "POST":
        data = json.loads(request.body)
        tbl_admin.objects.create(
            admin_name=data['name'],
            admin_email=data['email'],
            admin_password=data['pass']
        )
        return JsonResponse({'msg': "Data inserted"})
    return JsonResponse({'admins': admindata})









    

@csrf_exempt
def editadmin(request,eid):
    editdata = tbl_admin.objects.get(id=eid)
    if request.method == "PUT":
        data = json.loads(request.body)
        editdata.admin_name = data['name']
        editdata.admin_email = data['email']
        editdata.admin_password = data['pass']
        editdata.save()
        return JsonResponse({'msg':"Data Updated.."})
    return JsonResponse({"admin_name":editdata.admin_name,"admin_email":editdata.admin_email,"admin_password":editdata.admin_password,'admin_id':editdata.id})

@csrf_exempt
def deleteadmin(request, did):
    tbl_admin.objects.get(id=did).delete()
    return JsonResponse({'msg':"Admin Deleted.."})






@csrf_exempt
def place(request):
    districtdata = list(tbl_district.objects.values())
    placedata= list(tbl_place.objects.values('id','place_name','district_id','district__district_name'))
    if request.method == "POST":
        data = json.loads(request.body)
        place_name = data['place_name']
        district = tbl_district.objects.get(id=data['district_id'])
        tbl_place.objects.create(place_name=place_name,district=district)
        return JsonResponse({'msg':"Data Inserted.."})
    return JsonResponse({'districtdata':districtdata,'placedata':placedata})

@csrf_exempt
def deleteplace(request,did):
    tbl_place.objects.get(id=did).delete()
    return JsonResponse({'msg':"Data Deleted..."})







@csrf_exempt
def Subcategory(request):
    categorydata = list(tbl_category.objects.values())
    subcatdata= list(tbl_subcategory.objects.values('id','subcategory_name','category_id','category__category_name'))
    if request.method == "POST":
        data = json.loads(request.body)
        subcategory_name = data['subcategory_name']
        category = tbl_category.objects.get(id=data['category_id'])
        tbl_subcategory.objects.create(subcategory_name=subcategory_name,category=category)
        return JsonResponse({'msg':"Data Inserted.."})
    return JsonResponse({'category':categorydata,'subcategory':subcatdata})

@csrf_exempt
def deletesubcategory(request,did):
    tbl_subcategory.objects.get(id=did).delete()
    return JsonResponse({'msg':"Data Deleted..."})





@csrf_exempt
def Type(request):
    type = list(tbl_type.objects.values())
    if request.method == "POST":
        data = json.loads(request.body)
        tbl_type.objects.create(type_name=data['type'])
        return JsonResponse({'msg':"Data inserted.."})
    return JsonResponse({"data":type})

@csrf_exempt
def deletetype(request, did):
    tbl_type.objects.get(id=did).delete()
    return JsonResponse({'msg':"Data Deleted.."})

@csrf_exempt
def edittype(request,eid):
    editdata = tbl_type.objects.get(id=eid)
    if request.method == "PUT":
        data = json.loads(request.body)
        editdata.type_name = data['type']
        editdata.save()
        return JsonResponse({'msg':"Data Updated.."})
    return JsonResponse({"type_name":editdata.type_name,'type_id':editdata.id})








@csrf_exempt
def Subtype(request):
    typedata = list(tbl_type.objects.values())
    subtypedata= list(tbl_subtype.objects.values('id','subtype_name','type_id','type__type_name'))
    if request.method == "POST":
        data = json.loads(request.body)
        subtype_name = data['subtype_name']
        type = tbl_type.objects.get(id=data['type_id'])
        tbl_subtype.objects.create(subtype_name=subtype_name,type=type)
        return JsonResponse({'msg':"Data Inserted.."})
    return JsonResponse({'type':typedata,'subtype':subtypedata})


@csrf_exempt
def deletesubtype(request,did):
    tbl_subtype.objects.get(id=did).delete()
    return JsonResponse({'msg':"Data Deleted..."})











@csrf_exempt
def User(request):
    # CREATE USER
    if request.method == 'POST':
        tbl_user.objects.create(
            user_name=request.POST.get('user_name'),
            user_email=request.POST.get('user_email'),
            user_password=request.POST.get('user_password'),
            user_photo=request.FILES.get('user_photo'),
            user_proof=request.FILES.get('user_proof'),
            place_id=tbl_place.objects.get(id=request.POST.get('place_id'))
        )
        return JsonResponse({"message": "User added successfully"})

    # GET USERS
    userdata = list(
        tbl_user.objects.select_related('place_id').values(
            'id',
            'user_name',
            'user_email',
            'user_photo',
            'user_proof'
            'place_id__place_name'
        )
    )
    return JsonResponse({'user': userdata})



@csrf_exempt
def UserGetById(request, id):
    try:
        userdata = tbl_user.objects.select_related('place_id').filter(id=id).values(
            'id',
            'user_name',
            'user_email',
            'user_photo',
            'user_password',
            'place_id__place_name'
        ).first()

        if userdata:
            return JsonResponse({'user': userdata}, status=200)
        else:
            return JsonResponse({'user': None, 'error': 'User not found'}, status=404)
    except Exception as e:
        return JsonResponse({'user': None, 'error': str(e)}, status=500)
    userdata = list(
        tbl_user.objects.select_related('place_id').filter(id=id).values(
            'id',
            'user_name',
            'user_email',
            'user_photo',
            'user_password',
            'place_id__place_name'
        )
    )
    return JsonResponse({'user': userdata[0]})


@csrf_exempt
def deleteuser(request, did):
    tbl_user.objects.filter(id=did).delete()
    return JsonResponse({'msg': "Data Deleted..."})

@csrf_exempt
def edituser(request,eid):
    editdata = tbl_user.objects.get(id=eid)
    if request.method == "PUT":
        data = json.loads(request.body)
        editdata.user_name = data['user_name']
        editdata.user_email = data['user_email']
        

        editdata.save()
        return JsonResponse({'msg':"Data Updated.."})
    return JsonResponse({"user_name":editdata.user_name,"user_email":editdata.user_email,'user_id':editdata.id})

















@csrf_exempt
def Level(request):
    level = list(tbl_level.objects.values()) 
    if request.method == "POST": 
        data = json.loads(request.body)
        tbl_level.objects.create(level_name=data['level_name'])
        return JsonResponse({'msg':"Data Inserted.."})
    return JsonResponse({"data":level})

@csrf_exempt
def deletelevel(request, did):
    tbl_level.objects.get(id=did).delete()
    return JsonResponse({'msg':"Data Deleted.."})

@csrf_exempt
def editlevel(request,eid):
    editdata = tbl_level.objects.get(id=eid)
    if request.method == "PUT":
        data = json.loads(request.body)
        editdata.level_name = data['level_name']
        editdata.save()
        return JsonResponse({'msg':"Data Updated.."})
    return JsonResponse({"level_name":editdata.level_name,'level_id':editdata.id})







































import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def Lawyer(request):
    # -------- GET : Fetch Lawyers --------
    if request.method == "GET":
        category_id = request.GET.get("category")
        qs = tbl_lawyer.objects.filter(lawyer_status="1")

        if category_id:
            qs = qs.filter(categories__id=category_id).distinct()

        lawyers = []

        for lawyer in qs:
            lawyers.append({
                "id": lawyer.id,
                "lawyer_name": lawyer.lawyer_name,
                "lawyer_email": lawyer.lawyer_email,
                "lawyer_photo": lawyer.lawyer_photo.url if lawyer.lawyer_photo else "",
                "lawyer_proof": lawyer.lawyer_proof.url if lawyer.lawyer_proof else "",
                "lawyer_address": lawyer.lawyer_address,
                "lawyer_status": lawyer.lawyer_status,
                "lawyer_qualification": lawyer.lawyer_qualification,
                "place_name": lawyer.place_id.place_name if lawyer.place_id else "No Place",
                "categories": list(lawyer.categories.values("id", "category_name"))
            })

        return JsonResponse({"lawyers": lawyers}, status=200)

    # -------- POST : Add Lawyer --------
    elif request.method == "POST":
        try:
            data = request.POST

            # Convert category JSON string to list
            category_ids = data.get("category")
            if category_ids:
                category_ids = json.loads(category_ids)
            else:
                category_ids = []

            place = tbl_place.objects.get(id=data.get("place_id"))

            lawyer = tbl_lawyer.objects.create(
                lawyer_name=data.get("lawyer_name"),
                lawyer_email=data.get("lawyer_email"),
                lawyer_password=data.get("lawyer_password"),
                lawyer_photo=request.FILES.get("lawyer_photo"),
                lawyer_proof=request.FILES.get("lawyer_proof"),
                lawyer_address=data.get("lawyer_address"),
                lawyer_status=data.get("lawyer_status", "0"),
                lawyer_qualification=data.get("lawyer_qualification"),
                place_id=place,
            )

            if category_ids:
                lawyer.categories.set(
                    tbl_category.objects.filter(id__in=category_ids)
                )

            return JsonResponse({"msg": "Lawyer added successfully", "lawyer_id": lawyer.id}, status=201)

        except tbl_place.DoesNotExist:
            return JsonResponse({"error": "Invalid place ID"}, status=400)

        except Exception as e:
            print(e)   # <-- this will show the real error in terminal
            return JsonResponse({"error": str(e)}, status=500)

    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def deletelawyer(request, did):
    tbl_lawyer.objects.get(id=did).delete()
    return JsonResponse({'msg': 'Lawyer Deleted Successfully'})


















@csrf_exempt
def lawyerupdate(request, lid):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
        except:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        try:
            lawyer = tbl_lawyer.objects.get(id=lid)
        except tbl_lawyer.DoesNotExist:
            return JsonResponse({"error": "Lawyer not found"}, status=404)

        lawyer.lawyer_name = data.get("lawyer_name", lawyer.lawyer_name)
        lawyer.lawyer_email = data.get("lawyer_email", lawyer.lawyer_email)
        lawyer.lawyer_qualification = data.get("lawyer_qualification", lawyer.lawyer_qualification)
        lawyer.lawyer_address = data.get("lawyer_address", lawyer.lawyer_address)

        if "lawyer_status" in data:
            lawyer.lawyer_status = data["lawyer_status"]  

        lawyer.save()

        
        updated_lawyer = tbl_lawyer.objects.filter(id=lid).values(
            'id',
            'lawyer_name',
            'lawyer_email',
            'lawyer_status',
            'place_id__place_name', 
        ).first()

        return JsonResponse({"msg": "Updated successfully", "lawyer": updated_lawyer}, status=200)

    return JsonResponse({"error": "Invalid request method"}, status=400)



@csrf_exempt
def LawyerGetById(request, id):
    try:
        
        lawyer = tbl_lawyer.objects.filter(id=id).values(
            "id",
            "lawyer_name",
            "lawyer_email",
            "lawyer_qualification",
            "lawyer_address",
            "lawyer_photo",
            "lawyer_proof",
            "place_id__place_name",  
        ).first()

        if lawyer:
            
            lawyer["place_name"] = lawyer.pop("place_id__place_name", "")
            return JsonResponse({"lawyer": lawyer})
        else:
            return JsonResponse({"error": "Lawyer not found"}, status=404)

    except Exception as e:
        print("Error in LawyerGetById:", e)
        return JsonResponse({"error": "Internal Server Error"}, status=500)







    










from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from server.models import tbl_request, tbl_requestfee


@csrf_exempt
def Request(request):

    # ---------- CREATE REQUEST ----------
    if request.method == 'POST':

        tbl_request.objects.create(
            request_file=request.FILES.get('request_file'),
            request_status=request.POST.get('request_status', 0),
            mode_status=request.POST.get('mode_status', 0),
            request_date=request.POST.get('request_date'),
            request_type=request.POST.get('request_type'),
            request_fee=request.POST.get('request_fee'),
            user_id_id=request.POST.get('user_id'),
            level_id_id=request.POST.get('level_id'),
            type_id_id=request.POST.get('type_id'),
            lawyer_id_id=request.POST.get('lawyer_id')
        )

        return JsonResponse({"message": "Request added successfully"})


    # ---------- FETCH REQUESTS ----------

    user_id = request.GET.get('user_id')
    lawyer_id = request.GET.get('lawyer_id')

    requests = tbl_request.objects.all()

    if user_id:
        requests = requests.filter(user_id_id=user_id)

    if lawyer_id:
        requests = requests.filter(lawyer_id_id=lawyer_id)

    requestdata = []

    for r in requests:

        # Get latest fee for this request
        fee = tbl_requestfee.objects.filter(request_id=r).order_by('-id').first()

        payment_status = 0
        request_fee = 0
        requestfee_id = None

        if fee:
            request_fee = fee.requestfee_amount
            requestfee_id = fee.id

            # 0 = not paid, 1 = paid
            if fee.request_status == 1:
                payment_status = 1
            else:
                payment_status = 0


        # Status text
        if r.request_status == 0:
            status_text = "Waiting for Lawyer"
        elif r.request_status == 1:
            status_text = "Accepted"
        elif r.request_status == 2:
            status_text = "Rejected"
        else:
            status_text = "Unknown"


        requestdata.append({
            "id": r.id,
            "request_file": r.request_file.url if r.request_file else None,
            "request_status": r.request_status,
            "status_text": status_text,
            "mode_status": r.mode_status,
            "request_date": r.request_date,
            "request_type": r.request_type,
            "request_fee": request_fee,
            "user_id_id": r.user_id_id,
            "level_name": r.level_id.level_name if r.level_id else None,
            "type_name": r.type_id.type_name if r.type_id else None,
            "lawyer_id_id": r.lawyer_id_id,
            "payment_status": payment_status,

            # ✅ IMPORTANT FIX
            "requestfee_id": requestfee_id
        })

    return JsonResponse({"requests": requestdata})




from django.db import transaction


@csrf_exempt
def requestupdate(request, id):
    if request.method == 'PUT':
        try:
            # Parse JSON safely
            data = json.loads(request.body)
            new_status = data.get('request_status')

            if new_status is None:
                return JsonResponse({"error": "request_status is required"}, status=400)

            # Use atomic transaction to avoid DB locks
            with transaction.atomic():
                updated = tbl_request.objects.filter(id=id).update(request_status=new_status)

            if updated == 0:
                return JsonResponse({"error": "Request not found"}, status=404)

            return JsonResponse({"message": "Status updated successfully"})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    












@csrf_exempt
def deleterequest(request, did):
    tbl_request.objects.get(id=did).delete()
    return JsonResponse({'msg': 'Request Deleted Successfully'})









# views.py
@csrf_exempt
def LawyerSchedules(request, lawyer_id):
    # Get all requests of this lawyer
    requests = Request.objects.filter(lawyer_id=lawyer_id)
    # Get schedules linked to these requests
    schedules = Schedule.objects.filter(request__in=requests).values(
        'id', 'schedule_date', 'schedule_time', 'schedule_link', 'schedule_venue'
    )
    return Response(list(schedules))


  



@csrf_exempt
def Requestreport(request, request_id=None):
    if request.method == "POST":
        try:
            request_id_post = request.POST.get("request_id")
            details = request.POST.get("requestreport_details")
            file = request.FILES.get("requestreport_file")

            if not request_id_post or not details or not file:
                return JsonResponse({"error": "Missing required fields"}, status=400)

            tbl_requestreport.objects.create(
                request_id_id=int(request_id_post),
                requestreport_details=details,
                requestreport_file=file
            )

            return JsonResponse({"msg": "Report added successfully"}, status=200)

        except Exception as e:
            print("ERROR in Requestreport POST:", e)
        return JsonResponse({"error": "Invalid request"}, status=400)


    if request_id:
        reports = list(
            tbl_requestreport.objects.filter(request_id_id=request_id)
            .values("id", "requestreport_details", "requestreport_file", "request_id_id")
        )
        return JsonResponse({"reports": reports}, status=200)

    return JsonResponse({"error": "Invalid request"}, status=400)





@csrf_exempt
def deleterequestreport(request, did):
    try:
        tbl_requestreport.objects.get(id=did).delete()
        return JsonResponse({'msg': 'Report Deleted Successfully'}, status=200)
    except tbl_requestreport.DoesNotExist:
        return JsonResponse({'error': 'Report not found'}, status=404)

@csrf_exempt
def Requestfee(request):
    if request.method == "POST":
        try:
            request_id = request.POST.get("request_id")
            amount = request.POST.get("requestfee_amount")
            details = request.POST.get("requestfee_details")

            if not request_id or not amount or not details:
                return JsonResponse({"error": "Missing required fields"}, status=400)

            request_obj = tbl_request.objects.get(id=request_id)

            # Prevent duplicate fee
            if tbl_requestfee.objects.filter(request_id=request_obj).exists():
                return JsonResponse({"error": "Fee already added"}, status=400)

            # Create fee
            tbl_requestfee.objects.create(
                requestfee_amount=float(amount),
                requestfee_details=details,
                request_id=request_obj,
                request_status=0
            )

            # 🔥 UPDATE tbl_request fee
            request_obj.request_fee = float(amount)
            request_obj.save()

            return JsonResponse({"msg": "Fee Added Successfully"}, status=200)

        except tbl_request.DoesNotExist:
            return JsonResponse({"error": "Request not found"}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)






@csrf_exempt
def UpdateRequestFeeStatus(request, id):

    if request.method == "POST":
        try:

            # get request
            request_obj = tbl_request.objects.get(id=id)

            # get latest fee added by lawyer
            fee_obj = tbl_requestfee.objects.filter(
                request_id=request_obj
            ).order_by('-id').first()

            if not fee_obj:
                return JsonResponse({"error": "Fee not added yet"}, status=404)

            # update payment status
            fee_obj.request_status = 1
            fee_obj.save()

            return JsonResponse({
                "msg": "Payment Completed Successfully",
                "payment_status": fee_obj.request_status
            })

        except tbl_request.DoesNotExist:
            return JsonResponse({"error": "Request not found"}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)













@csrf_exempt
def Feespayment(request, id):

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")

            req = tbl_requestfee.objects.get(id=id)

            req.request_status = 1
            req.save()

            return JsonResponse({
                "message": "Payment successful",
                "requestfee_id": req.id
            })

        except tbl_requestfee.DoesNotExist:
            return JsonResponse({"error": "Request fee not found"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)










from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from datetime import date, timedelta
import json

@csrf_exempt
def Paymentcomplete(request, id):

    if request.method == "POST":

        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")

            print("User:", user_id)
            print("Plan:", id)

            user = tbl_user.objects.get(id=user_id)
            plan = tbl_plan.objects.get(id=id)

            # Insert into planpurchase
            purchase = tbl_planpurchase.objects.create(
                user=user,
                plan=plan,
                payment_status=1
            )

            print("Purchase created:", purchase.id)

            # Subscription dates
            start = date.today()
            end = start + timedelta(days=plan.plan_duration)

            # Insert subscription
            subscription = tbl_subscription.objects.create(
                subscription_startdate=start,
                subscription_enddate=end,
                user_id=user,
                plan_id=plan
            )

            print("Subscription created:", subscription.id)

            return JsonResponse({
                "message": "Payment successful"
            })

        except Exception as e:
            print("ERROR:", e)
            return JsonResponse({"error": str(e)}, status=500)











@csrf_exempt
def Complaint(request):
   
    if request.method == "POST":
        data = json.loads(request.body)
        complaint_title = data.get('complaint_title', '')
        complaint_content = data.get('complaint_content', '')
        user_id = data.get('user_id') 

        if not user_id:
            return JsonResponse({'error': 'User not logged in'}, status=401)

        tbl_complaint.objects.create(
            complaint_title=complaint_title,
            complaint_content=complaint_content,
            user_id_id=user_id,       
            complaint_status="0",     
            complaint_reply=""
        )

        return JsonResponse({'msg': 'Complaint Registered Successfully'})

    
    elif request.method == "PUT":
        data = json.loads(request.body)
        complaint_id = data.get('id')
        reply_content = data.get('reply')

        if not complaint_id or not reply_content:
            return JsonResponse({'error': 'Complaint ID and reply required'}, status=400)

        try:
            complaint = tbl_complaint.objects.get(id=complaint_id)
            complaint.complaint_reply = reply_content
            complaint.complaint_status = "1"
            complaint.save()
            return JsonResponse({'msg': 'Reply sent successfully'})
        except tbl_complaint.DoesNotExist:
            return JsonResponse({'error': 'Complaint not found'}, status=404)
    
    else:
        complaintdata = list(
            tbl_complaint.objects.values(
                'id',
                'complaint_title',
                'complaint_content',
                'complaint_status',
                'complaint_reply',
                'user_id' 
            )
        )

        for c in complaintdata:
            c['complaint_status'] = str(c.get('complaint_status') or "0")

        return JsonResponse({'complaints': complaintdata})


@csrf_exempt
def deletecomplaint(request, did):
    tbl_complaint.objects.get(id=did).delete()
    return JsonResponse({'msg': 'Complaint Deleted Successfully'})























@csrf_exempt
def Rating(request):
    ratingdata = list(
        tbl_rating.objects.values(
            'id',
            'rating_count',
            'rating_comment',
            'user_id_id'
        )
    )
    if request.method == "POST":
        data = json.loads(request.body)
        rating_count = data['rating_count']
        rating_comment = data['rating_comment']
        user = tbl_user.objects.get(id=data['user_id'])
        tbl_rating.objects.create(
            rating_count=rating_count,
            rating_comment=rating_comment,
            user_id=user
        )
        return JsonResponse({'msg': 'Rating Added Successfully'})
    return JsonResponse({'ratings': ratingdata})


@csrf_exempt
def deleterating(request, did):
    tbl_rating.objects.get(id=did).delete()
    return JsonResponse({'msg': 'Rating Deleted Successfully'})


















@csrf_exempt
def Plan(request):
    plandata = list(tbl_plan.objects.values(
        'id', 'plan_name', 'plan_duration', 'plan_price'
    ))
    if request.method == "POST":
        data = json.loads(request.body)
        tbl_plan.objects.create(
            plan_name=data['plan_name'],
            plan_duration=data['plan_duration'],
            plan_price=data['plan_price']
        )
        return JsonResponse({'msg': 'Plan Added Successfully'})
    return JsonResponse({'plans': plandata})


@csrf_exempt
def deleteplan(request, did):
    tbl_plan.objects.get(id=did).delete()
    return JsonResponse({'msg': 'Plan Deleted Successfully'})













@csrf_exempt
def CheckPayment(request):

    user_id = request.GET.get("user_id")

    if not user_id:
        return JsonResponse({"paid": False})

    paid = tbl_planpurchase.objects.filter(
        user_id=user_id,
        payment_status=1
    ).exists()

    return JsonResponse({"paid": paid})

















@csrf_exempt
def Subscription(request):

    if request.method == "POST":
        # Add new subscription
        data = json.loads(request.body.decode('utf-8'))

        subscription_startdate = data.get('subscription_startdate')
        subscription_enddate = data.get('subscription_enddate')
        user_id = data.get('user_id')
        plan_id = data.get('plan_id')

        from .models import tbl_user, tbl_plan, tbl_subscription

        user = tbl_user.objects.get(id=int(user_id))
        plan = tbl_plan.objects.get(id=int(plan_id))

        tbl_subscription.objects.create(
            subscription_startdate=subscription_startdate,
            subscription_enddate=subscription_enddate,
            user_id=user,
            plan_id=plan
        )

        return JsonResponse({'msg': 'Subscription Added Successfully'})


    elif request.method == "GET":

        user_id = request.GET.get("user_id")

        if not user_id:
            return JsonResponse({"subscribed": False})

        from .models import tbl_planpurchase

       
        paid = tbl_planpurchase.objects.filter(
            user_id=int(user_id),
            payment_status=1
        ).exists()

        return JsonResponse({"subscribed": paid})


    else:

        from .models import tbl_subscription

        subscriptions = tbl_subscription.objects.select_related(
            'plan_id', 'user_id'
        ).values(
            'id',
            'subscription_startdate',
            'subscription_enddate',
            'plan_id__plan_name',
            'user_id'
        )

        data = [
            {
                'id': s['id'],
                'subscription_startdate': s['subscription_startdate'],
                'subscription_enddate': s['subscription_enddate'],
                'plan_name': s['plan_id__plan_name'],
                'user_id': s['user_id']
            }
            for s in subscriptions
        ]

        return JsonResponse({'subscriptions': data})
















@csrf_exempt
def CheckSubscription(request):
    """
    Returns whether a user has an active paid subscription.
    Only users with payment_status=1 are considered subscribed.
    """
    user_id = request.GET.get("user_id")
    print("CheckSubscription called with user_id:", user_id)  # DEBUG

    if not user_id:
        print("No user_id provided")
        return JsonResponse({"subscribed": False})

    try:
        user_id_int = int(user_id)
    except ValueError:
        print("Invalid user_id format")
        return JsonResponse({"subscribed": False})

    try:
        subscribed = tbl_planpurchase.objects.filter(
            user_id=user_id_int,
            payment_status=1
        ).exists()

        print(f"Subscription found for user {user_id_int}: {subscribed}")  # DEBUG
        return JsonResponse({"subscribed": subscribed})

    except Exception as e:
        print("Error in CheckSubscription:", e)
        return JsonResponse({"error": str(e)}, status=400)



    


from datetime import date, timedelta


@csrf_exempt
def PaymentSuccess(request):
   
    try:
        data = json.loads(request.body)
        user_id = data.get("user_id")
        plan_id = data.get("plan_id")

        if not user_id or not plan_id:
            return JsonResponse({"error": "Missing user_id or plan_id"}, status=400)

        user = tbl_user.objects.get(id=user_id)
        plan = tbl_plan.objects.get(id=plan_id)

        # 1️⃣ Add payment record
        plan_purchase, created = tbl_planpurchase.objects.get_or_create(
            user=user,
            plan=plan,
            defaults={"payment_status": 1},
        )
        if not created:
            # Update payment_status if record exists
            plan_purchase.payment_status = 1
            plan_purchase.save()

        # 2️⃣ Add subscription record
        today = date.today()
        end_date = today + timedelta(days=plan.plan_duration)

        subscription, sub_created = tbl_subscription.objects.get_or_create(
            user_id=user,
            plan_id=plan,
            defaults={
                "subscription_startdate": today,
                "subscription_enddate": end_date,
            },
        )
        if not sub_created:
            # Update dates if subscription exists
            subscription.subscription_startdate = today
            subscription.subscription_enddate = end_date
            subscription.save()

        return JsonResponse({"msg": "Payment and subscription successful"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



@csrf_exempt
def Login(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        email    = body.get('email')
        password = body.get('password')

        
        user = tbl_user.objects.filter(user_email=email, user_password=password).first()
        admin = tbl_admin.objects.filter(admin_email=email, admin_password=password).first()
        lawyer = tbl_lawyer.objects.filter(lawyer_email=email, lawyer_password=password).first()

        if user:
            return JsonResponse({'role': 'user',  'id': user.id,
                                 'message': 'Login successful'})

        elif admin:
            return JsonResponse({'role': 'admin', 'id': admin.id,
                                 'message': 'Login successful'})
        
        elif lawyer:
            return JsonResponse({'role': 'lawyer', 'id': lawyer.id,
                                 'message': 'Login successful'})

        return JsonResponse({'message': 'Invalid email or password'}, status=401)

    return JsonResponse({'error': 'Method not allowed'}, status=405)




























@csrf_exempt  
def Userpassword(request, uid):  
    if request.method == 'PUT':
        try:
            body = json.loads(request.body)
            new_password = body.get('new_password')

            user = tbl_user.objects.filter(id=uid).first()
            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)

           
            user.user_password = new_password
            user.save()

            return JsonResponse({'message': 'Password changed successfully'}, status=200)

        except Exception as e:
            print("Error:", e)
            return JsonResponse({'error': 'Something went wrong'}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)



@csrf_exempt  
def Lawyerpassword(request, lid):  
    if request.method == 'PUT':
        try:

            body = json.loads(request.body)
            new_password = body.get('new_password')
            print(lid)
            print("helloo")
            lawyer = tbl_lawyer.objects.filter(id=lid).first()
            if not lawyer:
                return JsonResponse({'error': 'Lawyer not found'}, status=404)

           
            lawyer.lawyer_password = new_password
            lawyer.save()

            return JsonResponse({'message': 'Password changed successfully'}, status=200)
        
        except Exception as e:
            print("Error:", e)
            return JsonResponse({'error': 'Something went wrong'}, status=500)

        
    return JsonResponse({'error': 'Invalid request'}, status=400)















@csrf_exempt
def Lawyercategory(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            category_id = int(data["category_id"])
            lawyer_id = int(data["lawyer_id"])

            category_obj = tbl_category.objects.get(id=category_id)
            lawyer_obj = tbl_lawyer.objects.get(id=lawyer_id)

            tbl_lawyercategory.objects.create(
                category_id=category_obj,
                lawyer_id=lawyer_obj
            )

            return JsonResponse({"msg": "Data Inserted Successfully"})

        except Exception as e:
            print("ERROR:", e)
            return JsonResponse({"error": str(e)}, status=500)

    categorydata = list(
        tbl_category.objects.values("id", "category_name")
    )
    return JsonResponse({"categorydata": categorydata})





















@csrf_exempt
def Leveltype(request, id):
    if request.method == "POST":

        level_id = request.POST.get("level_id")
        type_id = request.POST.get("type_id")

        tbl_request.objects.filter(id=id).update(
            level_id_id=level_id,
            type_id_id=type_id
        )

        return JsonResponse({
            "status": True,
            "message": "Level and Type added successfully"
        })

    return JsonResponse({"status": False, "message": "Invalid request"})
    











@csrf_exempt
def MyRequestView(request, uid):

    requests = tbl_request.objects.select_related(
        'level_id',
        'type_id'
    ).filter(user_id=uid)

    request_data = []

    for r in requests:

        fees = tbl_requestfee.objects.filter(request_id=r)
        fee_added = 1 if fees.exists() else 0

        is_paid = fees.exists() and all(f.request_status == 1 for f in fees)

        request_data.append({
            "id": r.id,
            "request_date": r.request_date,
            "request_status": r.request_status,
            "level_name": r.level_id.level_name if r.level_id else None,
            "type_name": r.type_id.type_name if r.type_id else None,
            "fee_added": fee_added,
            "payment_status": 1 if is_paid else 0
        })

    return JsonResponse({"requests": request_data})

















@csrf_exempt
def GetRequestFee(request, id):
    try:
        request_obj = tbl_request.objects.get(id=id)

        fees = tbl_requestfee.objects.filter(request_id__id=id)

        fee_list = []

        for fee in fees:
            fee_list.append({
                "id": fee.id,
                "requestfee_amount": fee.requestfee_amount,
                "requestfee_details": fee.requestfee_details,
                "request_status": fee.request_status  
            })

        return JsonResponse({
            "fees": fee_list,
            "request_status": request_obj.request_status
        })

    except tbl_request.DoesNotExist:
        return JsonResponse({"error": "Request not found"}, status=404)















@csrf_exempt
def Schedule(request, request_id):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        schedule_date = data.get("schedule_date")
        schedule_time = data.get("schedule_time")
        schedule_link = data.get("schedule_link")
        schedule_venue = data.get("schedule_venue")
        schedule_status = data.get("schedule_status", 0)  

        if not schedule_date or not schedule_time:
            return JsonResponse({"error": "Date and Time are required"}, status=400)


        try:
            req = tbl_request.objects.get(id=request_id)
        except tbl_request.DoesNotExist:
            return JsonResponse({"error": "Request not found"}, status=404)

        
        if req.mode_status == "1" and not schedule_link:
            return JsonResponse({"error": "Schedule link required for online meeting"}, status=400)
        if req.mode_status == "2" and not schedule_venue:
            return JsonResponse({"error": "Venue required for offline meeting"}, status=400)

        schedule = tbl_schedule.objects.create(
            request_id=req,                           
            schedule_date=schedule_date,
            schedule_time=schedule_time,
            schedule_link=schedule_link if req.mode_status == "1" else None,
            schedule_venue=schedule_venue if req.mode_status == "2" else None,
            schedule_status=schedule_status
        )

        return JsonResponse({"success": "Schedule Added", "schedule_id": schedule.id})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)







@csrf_exempt
def GetSchedules(request, request_id):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET allowed"}, status=405)

    try:
        req = tbl_request.objects.get(id=request_id)
    except tbl_request.DoesNotExist:
        return JsonResponse({"error": "Request not found"}, status=404)

    schedules = tbl_schedule.objects.filter(request_id=req).values(
        "id",
        "schedule_date",
        "schedule_time",
        "schedule_link",
        "schedule_venue",
        "schedule_status"
    )

    return JsonResponse({"schedules": list(schedules)})




@csrf_exempt
def upcoming_appointments_count(request):
    lawyer_id = request.user.id  
    today = timezone.localdate()  
    count = tbl_schedule.objects.filter(
        request_id__lawyer_id=lawyer_id,
        schedule_date__gte=today,  
        schedule_status=0           #
    ).count()

    return JsonResponse({'upcoming_count': count})




@csrf_exempt
def lawyer_dashboard_summary(request):
    lawyer_id = request.GET.get('lawyer_id')
    if not lawyer_id:
        return JsonResponse({'error': 'lawyer_id not provided'}, status=400)

    try:
        lawyer_id = int(lawyer_id)
    except ValueError:
        return JsonResponse({'error': 'Invalid lawyer_id'}, status=400)

    today = timezone.localdate()

    
    appointments_count = tbl_schedule.objects.filter(
        request_id__lawyer_id=lawyer_id,
        schedule_date__gte=today,
        schedule_status=0
    ).count()

    
    clients_count = tbl_request.objects.filter(
        lawyer_id=lawyer_id,
        request_status=1  # accepted
    ).count()

  
    earnings = tbl_requestfee.objects.filter(
        request_id__lawyer_id=lawyer_id,
        request_status=1
    ).aggregate(total=Sum('requestfee_amount'))['total'] or 0

    new_requests_count = tbl_request.objects.filter(
        lawyer_id=lawyer_id,
        request_status=0
    ).count()

    return JsonResponse({
        'appointments': appointments_count,
        'clients': clients_count,
        'earnings': earnings,
        'new_requests': new_requests_count
    })




@csrf_exempt
def GetRequest(request, id):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET allowed"}, status=405)
    
    try:
        req = tbl_request.objects.get(id=id)
        return JsonResponse({
            "id": req.id,
            "mode_status": req.mode_status  
        })
    except tbl_request.DoesNotExist:
        return JsonResponse({"error": "Request not found"}, status=404)
    























@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            
            user_name = request.POST.get("name")
            user_email = request.POST.get("email")
            user_password = request.POST.get("password")
            place_id = request.POST.get("place_id")
            user_photo = request.FILES.get("user_photo")
            user_proof = request.FILES.get("user_proof")

            if not all([user_name, user_email, user_password, place_id, user_photo, user_proof]):
                return JsonResponse({"error": "All fields and files are required"}, status=400)

            
            if tbl_user.objects.filter(user_email=user_email).exists():
                return JsonResponse({"error": "Email already registered"}, status=400)

            place = tbl_place.objects.get(id=place_id)

           
            user = tbl_user.objects.create(
                user_name=user_name,
                user_email=user_email,
                user_password=user_password,
                place_id=place,
                user_photo=user_photo,
                user_proof=user_proof
            )

            return JsonResponse({"message": "Registered successfully"}, status=201)

        except tbl_place.DoesNotExist:
            return JsonResponse({"error": "Invalid place"}, status=400)
        except Exception as e:
            import traceback
            traceback.print_exc()
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
















@csrf_exempt
def get_local_lawyers(request, user_id):
    try:
       
        user = tbl_user.objects.get(id=user_id)

        lawyers = tbl_lawyer.objects.filter(
            place_id__district_id=user.place_id.district_id,
            lawyer_status="1"
        )

        lawyer_data = []
        for lawyer in lawyers:
            lawyer_data.append({
                "id": lawyer.id,
                "name": lawyer.lawyer_name,
                "photo": lawyer.lawyer_photo.url if lawyer.lawyer_photo else None,
                "qualification": lawyer.lawyer_qualification,
                "district": lawyer.place_id.district.district_name,
            })

        return JsonResponse({"lawyers": lawyer_data})

    except tbl_user.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)









@csrf_exempt
def pending_requests(request):
    lawyer_id = request.GET.get('lawyer_id')

    if not lawyer_id:
        return JsonResponse({"error": "Lawyer ID required"}, status=400)

    
    requests = tbl_request.objects.filter(
        lawyer_id_id=lawyer_id,
        request_status=0
    ).select_related('user_id', 'user_id__place_id')

    data = []

    for req in requests:
        data.append({
            "request_id": req.id,
            "request_type": req.request_type,
            "request_date": req.request_date,
            "request_fee": req.request_fee,

            
            "user_name": req.user_id.user_name,
            "user_email": req.user_id.user_email,
            "user_photo": req.user_id.user_photo.url if req.user_id.user_photo else None,
            "user_place": req.user_id.place_id.place_name if req.user_id.place_id else "",
        })

    return JsonResponse(data, safe=False)













from django.http import JsonResponse
from django.db.models import Sum, Avg, IntegerField
from django.db.models.functions import Cast
from .models import tbl_user, tbl_lawyer, tbl_planpurchase, tbl_rating


def admin_dashboard(request):

    # Total users
    total_users = tbl_user.objects.count()

    # Approved lawyers
    total_lawyers = tbl_lawyer.objects.filter(lawyer_status="1").count()

    # Revenue from paid plans
    revenue = tbl_planpurchase.objects.filter(payment_status=1).aggregate(
        total=Sum("plan__plan_price")
    )["total"] or 0

    # Average rating (convert CharField to Integer)
    avg_rating = tbl_rating.objects.annotate(
        rating_int=Cast("rating_count", IntegerField())
    ).aggregate(
        avg=Avg("rating_int")
    )["avg"] or 0

    return JsonResponse({
        "total_users": total_users,
        "total_lawyers": total_lawyers,
        "total_revenue": revenue,
        "avg_rating": round(avg_rating, 1)
    })