package com.capitalfocus.reportengine.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.capitalfocus.reportengine.dao.reportengineDAO;
import com.capitalfocus.reportengine.model.ReporterFormBean;
import com.capitalfocus.reportengine.model.User;
import com.capitalfocus.reportengine.service.ReportServices;

@Controller
public class HomeController {

	@Autowired
	private reportengineDAO reportDAO;
	@Autowired
	private ReportServices serviceList;

	@RequestMapping(value = "/")
	public ModelAndView login() throws IOException {
		//reportDAO.uploadTradeData();
		//reportDAO.uploadClientData();
		//reportDAO.generateReportData("first");
		return new ModelAndView("login");
	}

	@RequestMapping(value = "/home")
	public ModelAndView home(HttpSession session) throws IOException {
		if (!serviceList.isSessionValid(session.getId()))
			return new ModelAndView("login");
		
		return new ModelAndView("home");
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/login.authenticate",method=RequestMethod.POST)
	@ResponseBody
	public HashMap authenticate(
			@RequestParam(value = "username", required = true) String username,
			@RequestParam(value = "password", required = true) String password,
			HttpSession session) throws IOException {
		
		HashMap responseObj = new HashMap();
		responseObj.put("success", new Boolean(true));
		System.out.println("username----"+username);
		System.out.println("password----"+password);
		User usrObj = reportDAO.validateUser(username, password);
		if (usrObj != null)
		{
			responseObj.put("result", new Boolean(true));
			System.out.println("userObj------>" + usrObj.getEmail());
			session.setAttribute("User", usrObj);
			serviceList.trackUserSession(username);
		}
		else
		{
			responseObj.put("result", new Boolean(false));
		}
		return responseObj;
	}
	
	@RequestMapping(value = "/logout")
	public ModelAndView logout() throws IOException {
		
		serviceList.removeUserSession(serviceList.getCurrentHttpSessionConfig().getId());
		return new ModelAndView("login");
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/uploadClientData",method=RequestMethod.POST)
	@ResponseBody
	public HashMap uploadClientData(@RequestParam("file") MultipartFile file) throws IOException {
		HashMap responseObj = new HashMap();
		responseObj.put("success", new Boolean(true));
		responseObj.put("uploadStatus", new Boolean(reportDAO.uploadClientData(file)));
		return responseObj;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/uploadTradingData",method=RequestMethod.POST)
	@ResponseBody
	public HashMap uploadTradingData(@RequestParam("file") MultipartFile file) throws IOException {
		HashMap responseObj = new HashMap();
		responseObj.put("success", new Boolean(true));
		responseObj.put("uploadStatus", new Boolean(reportDAO.uploadTradeData(file)));
		return responseObj;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/loadClientDetails",method=RequestMethod.POST)
	@ResponseBody
	public HashMap loadClientData() throws IOException {
		
		HashMap responseObj = new HashMap();
		responseObj.put("clientList", reportDAO.getAllClientRecords());
		return responseObj;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/generateReport",method=RequestMethod.POST)
	@ResponseBody
	public HashMap generateReports() throws IOException {
		
		HashMap responseObj = new HashMap();
		HashMap listOfReports = serviceList.getDefaultReports();
		String reportID = "REP0";
		HashMap reportMap = new HashMap();
		ArrayList reportTypeList = new ArrayList();
		reportMap.put("valueField", "-1");
		reportMap.put("displayField", "Please choose a report type");
		reportTypeList.add(reportMap);
		for (int i = 0;i<listOfReports.size();i++)
		{
			reportMap = new HashMap();
			String reportUID = reportID;
			if (i < 10) 
				reportUID = reportID + "0"+i;
			else
				reportUID = reportID +i+ "";
			
			if (listOfReports.get(reportUID.trim()) == null) continue;
			
			System.out.println(reportUID);
			reportMap.put("valueField", String.valueOf(reportUID.trim()));
			reportMap.put("displayField", listOfReports.get(reportUID.trim()).toString());
			reportTypeList.add(reportMap);
		}
		responseObj.put("listOfDefaultReports", reportTypeList);
		responseObj.put("timeline", serviceList.getDefaultTimeLine());
		return responseObj;
	}
	
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping(value = "/getReportsByType",method=RequestMethod.POST)
	@ResponseBody
	public HashMap getReportsByType(@ModelAttribute("ReporterFormBean") ReporterFormBean bean) {
		
		if (bean == null) bean = new ReporterFormBean();
		return reportDAO.generateReportData(bean);
	}
}
