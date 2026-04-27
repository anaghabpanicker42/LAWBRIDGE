from django.urls import path
from server import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
   
   path('District/',views.District),
   path('deletedistrict/<int:did>/',views.deletedistrict),
   path('editdistrict/<int:eid>/',views.editdistrict),

   path('Category/',views.Category),
   path('deletecategory/<int:did>/',views.deletecategory),
   path('editcategory/<int:eid>/',views.editcategory),

   path('Admin/',views.Admin),
   path('editadmin/<int:eid>/',views.editadmin),
   path('deleteadmin/<int:did>/',views.deleteadmin),
   path('lawyerupdate/<int:lid>/',views.lawyerupdate),

   path('place/',views.place),
   path('deleteplace/<int:did>/',views.deleteplace),

   path('Subcategory/',views.Subcategory),
   path('deletesubcategory/<int:did>/',views.deletesubcategory),

   path('Type/',views.Type),
   path('deletetype/<int:did>/',views.deletetype),
   path('edittype/<int:eid>/',views.edittype),

   path('Subtype/',views.Subtype),
   path('deletesubtype/<int:did>/',views.deletesubtype),

   path('User/',views.User),
   path('UserGetById/<int:id>/',views.UserGetById),
   path('deleteuser/<int:did>/',views.deleteuser),
   path('edituser/<int:eid>/',views.edituser),
  

   path('Level/',views.Level),
   path('deletelevel/<int:did>/',views.deletelevel),
   path('editlevel/<int:eid>/',views.editlevel),


   path('Lawyer/',views.Lawyer),
   path('deletelawyer/<int:did>/',views.deletelawyer),
   path('lawyerupdate/<int:lid>/',views.lawyerupdate),
   path('LawyerGetById/<int:id>/',views.LawyerGetById),

   path('Request/',views.Request),
   path('deleterequest/<int:did>/',views.deleterequest),
   path('requestupdate/<int:id>/',views.requestupdate),

   path("RequestReport/", views.Requestreport),
   path("Requestreport/<int:request_id>/", views.Requestreport),  

   path('deleterequestreport/<int:did>/',views.deleterequestreport),

   path('Requestfee/',views.Requestfee),
   path('updaterequestfeestatus/<int:id>/', views.UpdateRequestFeeStatus),


   path('Complaint/',views.Complaint),
   path('deletecomplaint/<int:did>/',views.deletecomplaint),

   path('Rating/',views.Rating),
   path('deleterating/<int:did>/',views.deleterating),

   path('Plan/',views.Plan),
   path('deleteplan/<int:did>/',views.deleteplan),
   path('paymentsucces/',views.PaymentSuccess),
  
   path('Feespayment/<int:id>/', views.Feespayment),
   path("Paymentcomplete/<int:id>/", views.Paymentcomplete),
   path('LawyerSchedules<int:lawyer_id>/',views.LawyerSchedules),
   

   path('Subscription/',views.Subscription),
   path('CheckPayment/', views.CheckPayment, name='checkpayment'),
   

   path('Login/',views.Login),
   
   path('Lawyercategory/',views.Lawyercategory),

   path('Userpassword/<int:uid>/', views.Userpassword),
   path('Lawyerpassword/<int:lid>/', views.Lawyerpassword),

   path('Leveltype/<int:id>/', views.Leveltype),

   path('MyRequestView/<int:uid>/', views.MyRequestView),

   path('getrequestfee/<int:id>/', views.GetRequestFee),
   


   path('Schedule/<int:request_id>/', views.Schedule),
   path('GetSchedules/<int:request_id>/', views.GetSchedules, name='get_schedules'),
   path('api/upcoming-count/', views.upcoming_appointments_count, name='upcoming-count'),

   path('api/pending-requests/', views.pending_requests),

   path('GetRequest/<int:id>/', views.GetRequest),

   path('register/', views.register),

   path("local-lawyers/<int:user_id>/", views.get_local_lawyers),

   path('api/lawyer-dashboard-summary/', views.lawyer_dashboard_summary, name='lawyer-dashboard-summary'),

   path("admin_dashboard/", views.admin_dashboard),

   

   

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)   