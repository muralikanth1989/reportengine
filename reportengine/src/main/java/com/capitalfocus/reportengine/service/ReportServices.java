package com.capitalfocus.reportengine.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportServices {
	
	@Autowired
	HttpSession httpSession;
	
	@SuppressWarnings("rawtypes")
	private static Hashtable sessionTable = new Hashtable();
	
	public HttpSession getCurrentHttpSessionConfig()
	{
		return this.httpSession;
	}
	
	public boolean isSessionValid(String sessionId)
	{
		System.out.println("sessionId--->"+sessionId);
		
		if (!sessionTable.containsKey(sessionId))
			return false;
		else
			return true;
	}
	
	@SuppressWarnings("unchecked")
	public void trackUserSession(String username)
	{
		String sessionId = this.httpSession.getId();
		System.out.println(sessionId);
		if (!sessionTable.contains(sessionId))
		{
			sessionTable.put(sessionId, username);
		}
	}
	
	public void removeUserSession(String sessionId)
	{
		if (!sessionTable.contains(sessionId))
		{
			sessionTable.remove(sessionId);
		}
	}
	
	@SuppressWarnings("rawtypes")
	public HashMap getDefaultReports()
	{
		HashMap<String,String> listOfReports = new HashMap<String,String>();
		listOfReports.put("REP000","Total Volume");
		listOfReports.put("REP001","Total Volume by date");
		listOfReports.put("REP002","Total Volume by cost center");
		listOfReports.put("REP003","New cutomers Volume Vs Old Cutomers Volume");
		listOfReports.put("REP004","List of High Volume customers");
		listOfReports.put("REP005","Active customer list");
		listOfReports.put("REP006","Inactive customer list");
		listOfReports.put("REP007","No of Trades per customer");
		listOfReports.put("REP008","Total Volume by script");
		listOfReports.put("REP009","Odin Vs MegaTrader");
		listOfReports.put("REP010","New Clients list");
		listOfReports.put("REP011","Total customer count by cost centre");
		listOfReports.put("REP012","Inactive customer  count by cost centre");
		listOfReports.put("REP013","Total customer count by subbroker name");
		listOfReports.put("REP014","Total trade count by date");
		listOfReports.put("REP015","Total order count by date");
		
		return listOfReports;
	}
	public ArrayList<HashMap<String,String>> getDefaultTimeLine()
	{
		ArrayList<HashMap<String,String>> timeLineList = new ArrayList<HashMap<String,String>>();
		HashMap<String,String> reportMap = new HashMap<String,String>();
		reportMap.put("valueField", "-1");
		reportMap.put("displayField", "Any");
		timeLineList.add(reportMap);
		
		reportMap = new HashMap<String,String>();
		reportMap.put("valueField", "1 day");
		reportMap.put("displayField", "1 day");
		timeLineList.add(reportMap);
		
		reportMap = new HashMap<String,String>();
		reportMap.put("valueField", "2 days");
		reportMap.put("displayField", "2 days");
		timeLineList.add(reportMap);
		
		reportMap = new HashMap<String,String>();
		reportMap.put("valueField", "3 days");
		reportMap.put("displayField", "3 days");
		timeLineList.add(reportMap);
		
		reportMap = new HashMap<String,String>();
		reportMap.put("valueField", "1 week");
		reportMap.put("displayField", "1 week");
		timeLineList.add(reportMap);
		
		reportMap = new HashMap<String,String>();
		reportMap.put("valueField", "1 month");
		reportMap.put("displayField", "1 month");
		timeLineList.add(reportMap);
		
		return timeLineList;
	}
}
