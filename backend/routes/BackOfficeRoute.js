import { Router } from "express";
import { addJobOpening, addTeamMember, createAdmin, createCourse, createEvent, fetchApplicants, fetchLeads, fetchTeam, getAdminRole, getAllCourseApplications, getAllEvents, getAllUsers, getFeedbackByType, getJobOpenings, getLeadByApplicationNumber, getPaidCourseApplicants, getPartnersByType, getRolePermissions, getSlotBookingDetails, loginAdmin, saveRolePermissions, shareLeads, updateEmployeeStatus, updateFeedbackStatus, updateLeadStatus, updateOnboardingStatus, verifyCollege } from "../controllers/BackOfficeController.js";

const router = Router();

router.post('/login', loginAdmin)
router.post('/create', createAdmin)
router.get('/getpartners/:partnerType', getPartnersByType)
router.get('/slotbookings', getSlotBookingDetails)
router.get('/getAllUsers', getAllUsers);
router.put('/verifycollege/:collegeId', verifyCollege);
router.get('/feedbacks/:feedbackType', getFeedbackByType);
router.put('/updateFeedback/:feedbackId', updateFeedbackStatus);
router.put('/updateonboardingstatus/:collegeId', updateOnboardingStatus);
router.post('/team/add', addTeamMember);
router.get('/team/all', fetchTeam);
router.post('/addcourse', createCourse);
router.get('/applicants/all', fetchApplicants);
router.post('/job/add', addJobOpening);
router.get('/job/all', getJobOpenings);
router.post('/createevent', createEvent);
router.get('/getevents', getAllEvents);
router.get('/getcourseapplications', getAllCourseApplications);
router.get('/getpaidcourseapplicants', getPaidCourseApplicants);
router.get('/getroleperms/:role', getRolePermissions);
router.post('/saveroleperms/:role', saveRolePermissions);
router.get('/adminrole/:userId', getAdminRole);
router.get('/getleads', fetchLeads);
router.get('/getlead/:applicationNumber', getLeadByApplicationNumber);
router.post('/shareleads/:applicationNumber', shareLeads);
router.put('/leadStatus/:applicationNumber', updateLeadStatus);
router.put('/updateTeamStatus/:employeeID', updateEmployeeStatus);

export default router