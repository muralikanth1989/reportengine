package com.capitalfocus.reportengine.dao;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javassist.compiler.MemberResolver.Method;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.capitalfocus.reportengine.model.Client;
import com.capitalfocus.reportengine.model.ReporterFormBean;
import com.capitalfocus.reportengine.model.Tradedata;
import com.capitalfocus.reportengine.model.User;

@Repository
@Transactional
public class reportengineDAO {
	@Autowired
	private SessionFactory sessionFactory;

	public static String TOTAL_VOLUME = "select t.SYMBOL,sum(t.PRICE*t.TRADE_QUANTITY*c.CONVERSION_RATE) as Volume from TRADE_DATA t,CONVERSION_TABLE c where t.SYMBOL=c.SYMBOL and t.DATETIME between :startdate and :enddate group by t.SYMBOL";
	
	// public static String
	// TOTAL_VOLUME_BY_DATE="select t.SYMBOL,DATE(t.DATETIME),sum(t.PRICE*t.TRADE_QUANTITY*c.CONVERSION_RATE) as Volume from TRADE_DATA t,CONVERSION_TABLE c where t.SYMBOL=c.SYMBOL and t.DATETIME between :startdate and :enddate group by DATE(t.DATETIME)";
	public static String TOTAL_VOLUME_BY_DATE = "select DATE(t.DATETIME)as TradeDate ,sum(t.PRICE*t.TRADE_QUANTITY*c.CONVERSION_RATE) as Volume from TRADE_DATA t,CONVERSION_TABLE c where t.SYMBOL=c.SYMBOL and t.DATETIME between :startdate and :enddate group by DATE(t.DATETIME)";
	
	// public static String
	// TOTAL_VOLUME_BY_COSTCENTER="select c.clientCode,c.costCenterName,a.Volume from (select t.PARTICIPANT_SETTLER,t.PRICE*t.TRADE_QUANTITY*c.CONVERSION_RATE as Volume from TRADE_DATA t,CONVERSION_TABLE c where t.SYMBOL=c.SYMBOL and t.DATETIME between :startdate and :enddate) a,CLIENT_TABLE c where a.PARTICIPANT_SETTLER=c.clientCode";
	public static String TOTAL_VOLUME_BY_COSTCENTER = "select c.costCenterName,sum(Volume) as Volume from (select t.PARTICIPANT_SETTLER,t.PRICE*t.TRADE_QUANTITY*c.CONVERSION_RATE as Volume from TRADE_DATA t,CONVERSION_TABLE c where t.SYMBOL=c.SYMBOL and t.DATETIME between :startdate and :enddate) a,CLIENT_TABLE c where a.PARTICIPANT_SETTLER=c.clientCode group by c.costCenterCode";
	
	//public static String ACTIVE_CUSTOMERS = "select c.clientCode ,c.costCenterName,c.subBrokerName from CLIENT_TABLE c,(select distinct (t.PARTICIPANT_SETTLER) client_temp from TRADE_DATA t where t.DATETIME between :startdate and :enddate) AS clientTbl where client_temp=c.clientCode";
	public static String ACTIVE_CUSTOMERS = "select c.clientCode ,c.costCenterName,c.subBrokerName from (select distinct(PARTICIPANT_SETTLER) as clientCode from TRADE_DATA t where t.DATETIME between :startdate and :enddate )t,client_table c where t.clientCode=c.clientCode";	
	
	//public static String HIGH_VOLUME_CUSTOMERS = "select c.clientCode ,c.costCenterName,c.subBrokerName from CLIENT_TABLE c,(select distinct (c.clientCode) client_temp from TRADE_DATA t where t.DATETIME between :startdate and :enddate) where client_temp=c.clientCode";
	public static String HIGH_VOLUME_CUSTOMERS = "select c.clientCode,c.costCenterName,c.subBrokerName,a.Volume as Volume from (select t.PARTICIPANT_SETTLER,sum(t.PRICE*t.TRADE_QUANTITY*c.CONVERSION_RATE) as Volume from TRADE_DATA t,CONVERSION_TABLE c where t.SYMBOL=c.SYMBOL and t.DATETIME between :startdate and :enddate group by t.PARTICIPANT_SETTLER order by Volume desc )a,CLIENT_TABLE c where a.PARTICIPANT_SETTLER=c.clientCode";
	
	//public static String INACTIVE_CUSTOMERS = "select c.clientCode,c.costCenterName,c.subBrokerName from CLIENT_TABLE c where c.clientCode not in (select distinct (t.PARTICIPANT_SETTLER) from TRADE_DATA t where t.DATETIME >= :startdate)";
	public static String INACTIVE_CUSTOMERS = "select clientCode,costCenterName,subBrokerName from CLIENT_TABLE where clientCode not in (select distinct(PARTICIPANT_SETTLER) from TRADE_DATA where DATETIME >= :startdate )";
	
	public static String TRADE_PER_CUSTOMER = "select a.Volume,c.clientCode,c.costCenterName,c.subBrokerName from (select count(*) as Volume,PARTICIPANT_SETTLER from TRADE_DATA where DATETIME between :startdate and :enddate group by PARTICIPANT_SETTLER)a,CLIENT_TABLE c where a.PARTICIPANT_SETTLER=c.clientCode order by Volume desc";	
	
	public static String TOTAL_VOLUME_BY_SYMBOL = "select t.SYMBOL,t.PRICE*t.TRADE_QUANTITY*c.CONVERSION_RATE as Volume from TRADE_DATA t,CONVERSION_TABLE c where t.SYMBOL=c.SYMBOL and t.DATETIME between :startdate and :enddate group by t.SYMBOL";
	
	public static String NEW_CUSTOMERS = "select c.clientCode,c.costCenterName,c.subBrokerName from CLIENT_TABLE c where c.dateOfJoin >= :startdate";

	public static String CUSTOMER_PER_COSTCENTER = "select costCenterCode,costCenterName,count(*) as Volume from CLIENT_TABLE group by costCenterCode order by Volume desc";
	
	public static String INCUSTOMER_PER_COSTCENTER = "select costCenterCode,costCenterName,count(*) as Volume from CLIENT_TABLE where clientCode not in (select distinct(PARTICIPANT_SETTLER) from TRADE_DATA where DATETIME >= :startdate ) group by costCenterCode order by Volume desc";
	
	@SuppressWarnings("unchecked")
	@Transactional
	public User validateUser(String username, String password) {

		List<User> users = new ArrayList<User>();

		Session currentsession = sessionFactory.getCurrentSession();
		Query query = currentsession
				.createQuery("from User where username=? and password=?");
		query.setParameter(0, username);
		query.setParameter(1, password);
		users = query.list();
		if (users.size() > 0) {
			return users.get(0);
		} else {
			return null;
		}

	}

	@Transactional(propagation = Propagation.REQUIRED)
	public boolean uploadTradeData(MultipartFile uploadFile) {
		try {

			FileOutputStream outputStream = null;
			System.out.println(System.getProperty("java.io.tmpdir"));
			String filePath = System.getProperty("java.io.tmpdir") + "/"
					+ uploadFile.getOriginalFilename();
			try {
				outputStream = new FileOutputStream(new File(filePath));
				outputStream.write(uploadFile.getBytes());
				outputStream.close();
			} catch (Exception e) {
				System.out.println("Error while saving file");
				return false;
			}

			FileInputStream file = new FileInputStream(new File(filePath));
			XSSFWorkbook workbook = new XSSFWorkbook(file);

			// FormulaEvaluator evaluator =
			// workbook.getCreationHelper().createFormulaEvaluator();

			// Get first/desired sheet from the workbook
			// XSSFSheet sheet = workbook.getSheetAt(0);
			XSSFSheet sheet = workbook.getSheet("Trade");
			// Iterate through each rows one by one
			Iterator<Row> rowIterator = sheet.iterator();
			rowIterator.next();
			while (rowIterator.hasNext()) {
				Row row = rowIterator.next();
				// For each row, iterate through all the column
				// Iterator<Cell> cellIterator = row.cellIterator();
				int tradenumber = ((Double) row.getCell(0)
						.getNumericCellValue()).intValue();
				String tradesymbol = row.getCell(4).getStringCellValue();
				int tradeqnty = ((Double) row.getCell(16).getNumericCellValue())
						.intValue();
				int tradeprice = ((Double) row.getCell(17)
						.getNumericCellValue()).intValue();
				String setter = row.getCell(19).getStringCellValue();

				int tmid = ((Double) row.getCell(22).getNumericCellValue())
						.intValue();
				Date tradedate = row.getCell(24).getDateCellValue();

				Tradedata obj = new Tradedata();
				obj.setTradeNumber(tradenumber);
				obj.setSymbol(tradesymbol);
				obj.setTradeQnty(tradeqnty);
				obj.setPrice(tradeprice);
				obj.setParticipantSettler(setter);
				obj.setTMid(tmid);
				obj.setTradeDate(tradedate);
				sessionFactory.getCurrentSession().save(obj);
				/*
				 * while (cellIterator.hasNext()) { Cell cell =
				 * cellIterator.next(); // Check the cell type after eveluating
				 * formulae // If it is formula cell, it will be evaluated
				 * otherwise no // change will happen switch
				 * (evaluator.evaluateInCell(cell).getCellType()) { case
				 * Cell.CELL_TYPE_NUMERIC:
				 * System.out.print(cell.getNumericCellValue() + " "); break;
				 * case Cell.CELL_TYPE_STRING:
				 * System.out.print(cell.getStringCellValue() + " "); break;
				 * case Cell.CELL_TYPE_FORMULA:
				 * System.out.print(cell.getStringCellValue() + " "); // Not
				 * again break; } }
				 */
				// System.out.println("");
				// throw new RuntimeException();
			}
			file.close();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("eeeeeeeeeeeeeeeeee-->" + e.getMessage());
			return false;
		}
		return true;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public boolean uploadClientData(MultipartFile uploadFile) {
		try {

			FileOutputStream outputStream = null;
			System.out.println(System.getProperty("java.io.tmpdir"));
			String filePath = System.getProperty("java.io.tmpdir") + "/"
					+ uploadFile.getOriginalFilename();
			try {
				outputStream = new FileOutputStream(new File(filePath));
				outputStream.write(uploadFile.getBytes());
				outputStream.close();
			} catch (Exception e) {
				System.out.println("Error while saving file");
				return false;
			}

			FileInputStream file = new FileInputStream(new File(filePath));

			// Create Workbook instance holding reference to .xlsx file
			XSSFWorkbook workbook = new XSSFWorkbook(file);

			// FormulaEvaluator evaluator =
			// workbook.getCreationHelper().createFormulaEvaluator();

			// Get first/desired sheet from the workbook
			// XSSFSheet sheet = workbook.getSheetAt(0);
			XSSFSheet sheet = workbook.getSheet("Client table ");
			// Iterate through each rows one by one
			Iterator<Row> rowIterator = sheet.iterator();
			System.out.println("lastrownumber----->" + sheet.getLastRowNum());
			rowIterator.next();
			while (rowIterator.hasNext()) {
				Row row = rowIterator.next();
				// For each row, iterate through all the column
				// Iterator<Cell> cellIterator = row.cellIterator();

				Client client = new Client();
				String clientCode = row.getCell(0).getStringCellValue().trim();
				if (clientCode.length() == 0)
					break;
				client.setClientCode(clientCode);
				client.setClientName(row.getCell(1).getStringCellValue().trim());
				client.setCostCenterCode(row.getCell(2).getStringCellValue()
						.trim());
				client.setCostCenterName(row.getCell(3).getStringCellValue()
						.trim());
				client.setIntroBy(row.getCell(4).getStringCellValue().trim());
				client.setSubBrokerName(row.getCell(5).getStringCellValue()
						.trim());
				client.setPanNo(row.getCell(6).getStringCellValue().trim());
				// client.setMobileNumber(""+((Double)
				// row.getCell(7).getNumericCellValue()).intValue());
				client.setMobileNumber(((Double) row.getCell(7)
						.getNumericCellValue()).longValue() + "");
				client.setEmailID(row.getCell(8).getStringCellValue().trim());
				client.setSchemeCode(row.getCell(9).getStringCellValue().trim());
				client.setSchemeName(row.getCell(10).getStringCellValue()
						.trim());
				client.setDateOfJoin(row.getCell(11).getDateCellValue());

				System.out.println("client-------->" + client);

				sessionFactory.getCurrentSession().saveOrUpdate(client);
			}
			file.close();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public HashMap generateReportData(ReporterFormBean bean) {

		Session currentsession = sessionFactory.getCurrentSession();
		HashMap responseObj = new HashMap();
		responseObj.put("success", new Boolean(true));

		if (bean.getReportName().equalsIgnoreCase("REP000")) {
			ArrayList gridStore = new ArrayList();
			ArrayList gridColumns = new ArrayList();
			Query query = currentsession.createSQLQuery(TOTAL_VOLUME);
			// query.setParameter("startdate", "2014-05-02 00:00:00");
			// query.setParameter("enddate", "2014-05-02 23:59:59");
			query.setParameter("startdate", bean.getFromDate() + " 00:00:00");
			query.setParameter("enddate", bean.getToDate() + " 23:59:59");
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List results = query.list();
			boolean hasMoreResults = (results != null && results.size() > 0);
			for (Object object : results) {
				Map row = (Map) object;
				HashMap reportMap = new HashMap();
				reportMap.put("SYMBOL", row.get("SYMBOL"));
				try {
					reportMap.put("Volume",
							Integer.parseInt(row.get("Volume").toString()));

				} catch (Exception e) {
					reportMap.put("Volume", new Integer(0));
				}
				gridStore.add(reportMap);
			}
			gridColumns.add("SYMBOL");
			gridColumns.add("Volume");
			responseObj.put("gridStore", gridStore);
			responseObj.put("hasMoreResults", new Boolean(hasMoreResults));
			responseObj.put("reportName", bean.getReportName());
			responseObj.put("gridColumns", gridColumns);
		} else if (bean.getReportName().equalsIgnoreCase("REP001")) {
			long sumofVolume = 0;
			ArrayList gridStore = new ArrayList();
			ArrayList gridColumns = new ArrayList();
			Query query = currentsession.createSQLQuery(TOTAL_VOLUME_BY_DATE);
			query.setParameter("startdate", bean.getFromDate() + " 00:00:00");
			query.setParameter("enddate", bean.getToDate() + " 23:59:59");
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List results = query.list();
			System.out.println(results.size());
			boolean hasMoreResults = (results != null && results.size() > 0);
			long totalVolume = calculateTotalVolume(results);
			for (Object object : results) {
				Map row = (Map) object;
				HashMap reportMap = new HashMap();
				reportMap.put("Trade Date", row.get("TradeDate"));
				try {
					long mp = Long.parseLong(row.get("Volume").toString());
					reportMap.put("Volume", mp);
					reportMap.put("Percentage", mp * 100 / totalVolume);
				} catch (Exception e) {
					reportMap.put("Volume", 0);
					reportMap.put("Percentage", 0);
				}
				gridStore.add(reportMap);
			}
			gridColumns.add("Trade Date");
			gridColumns.add("Volume");
			gridColumns.add("Percentage");
			responseObj.put("gridStore", gridStore);
			responseObj.put("gridColumns", gridColumns);
			responseObj.put("hasMoreResults", new Boolean(hasMoreResults));
			responseObj.put("reportName", bean.getReportName());
		} else if (bean.getReportName().equalsIgnoreCase("REP002")) {
			ArrayList gridStore = new ArrayList();
			ArrayList gridColumns = new ArrayList();
			Query query = currentsession
					.createSQLQuery(TOTAL_VOLUME_BY_COSTCENTER);
			query.setParameter("startdate", bean.getFromDate() + " 00:00:00");
			query.setParameter("enddate", bean.getToDate() + " 23:59:59");
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List results = query.list();
			System.out.println("------->" + results.size());
			boolean hasMoreResults = (results != null && results.size() > 0);
			long totalVolume = calculateTotalVolume(results);
			for (Object object : results) {
				Map row = (Map) object;
				HashMap reportMap = new HashMap();
				System.out.println(row);
				reportMap.put("costCenterName", row.get("costCenterName"));
				try {
					long mp = Long.parseLong(row.get("Volume").toString());
					reportMap.put("Volume", mp);
					reportMap.put("Percentage", mp * 100 / totalVolume);

				} catch (Exception e) {
					reportMap.put("Volume", 0);
					reportMap.put("Percentage", 0);
				}
				gridStore.add(reportMap);
			}
			gridColumns.add("costCenterName");
			gridColumns.add("Volume");
			gridColumns.add("Percentage");
			responseObj.put("gridStore", gridStore);
			responseObj.put("gridColumns", gridColumns);
			responseObj.put("hasMoreResults", new Boolean(hasMoreResults));
			responseObj.put("reportName", bean.getReportName());
			responseObj.put("reportName", bean.getReportName());
		} else if (bean.getReportName().equalsIgnoreCase("REP004")) {
			ArrayList gridStore = new ArrayList();
			ArrayList gridColumns = new ArrayList();
			Query query = currentsession.createSQLQuery(HIGH_VOLUME_CUSTOMERS);
			query.setParameter("startdate", bean.getFromDate() + " 00:00:00");
			query.setParameter("enddate", bean.getToDate() + " 23:59:59");
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List results = query.list();
			System.out.println("*******S*******>" + results.size());
			boolean hasMoreResults = (results != null && results.size() > 0);
			long totalVolume = calculateTotalVolume(results);
			for (Object object : results) {
				Map row = (Map) object;
				HashMap reportMap = new HashMap();
				System.out.println(row);
				reportMap.put("clientCode", row.get("clientCode"));
				reportMap.put("costCenterName", row.get("costCenterName"));
				reportMap.put("subBrokerName", row.get("subBrokerName"));
				
				try {
					long mp = Long.parseLong(row.get("Volume").toString());
					reportMap.put("Volume", mp);
					reportMap.put("Percentage", new Float(mp * 100 / totalVolume));

				} catch (Exception e) {
					reportMap.put("Volume", 0);
					reportMap.put("Percentage", 0);
				}
				gridStore.add(reportMap);
			}
			System.out.println("gridStore--111--->"+gridStore);

			gridColumns.add("clientCode");
			gridColumns.add("costCenterName");
			gridColumns.add("subBrokerName");
			gridColumns.add("Volume");
			gridColumns.add("Percentage");

			responseObj.put("gridStore", gridStore);
			responseObj.put("gridColumns", gridColumns);

			responseObj.put("hasMoreResults", new Boolean(hasMoreResults));
			responseObj.put("reportName", bean.getReportName());
		} else if (bean.getReportName().equalsIgnoreCase("REP005")) {
			ArrayList gridStore = new ArrayList();
			ArrayList gridColumns = new ArrayList();
			Query query = currentsession.createSQLQuery(ACTIVE_CUSTOMERS);
			query.setParameter("startdate", bean.getFromDate() + " 00:00:00");
			query.setParameter("enddate", bean.getToDate() + " 23:59:59");
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List results = query.list();
			boolean hasMoreResults = (results != null && results.size() > 0);
			for (Object object : results) {
				Map row = (Map) object;
				HashMap reportMap = new HashMap();
				reportMap.put("Client Code", row.get("clientCode"));
				reportMap.put("CostCenter Name", row.get("costCenterName"));
				reportMap.put("Sub Broker Name", row.get("subBrokerName"));
				gridStore.add(reportMap);
			}
			gridColumns.add("Client Code");
			gridColumns.add("CostCenter Name");
			gridColumns.add("Sub Broker Name");
			responseObj.put("gridStore", gridStore);
			responseObj.put("hasMoreResults", new Boolean(hasMoreResults));
			responseObj.put("reportName", bean.getReportName());
			responseObj.put("gridColumns", gridColumns);
		} else if (bean.getReportName().equalsIgnoreCase("REP006")) {
			ArrayList gridStore = new ArrayList();
			ArrayList gridColumns = new ArrayList();
			Query query = currentsession.createSQLQuery(INACTIVE_CUSTOMERS);
			query.setParameter("startdate", bean.getFromDate() + " 00:00:00");
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List results = query.list();
			boolean hasMoreResults = (results != null && results.size() > 0);
			for (Object object : results) {
				Map row = (Map) object;
				HashMap reportMap = new HashMap();
				reportMap.put("Client Code", row.get("clientCode"));
				reportMap.put("CostCenter Name", row.get("costCenterName"));
				reportMap.put("Sub Broker Name", row.get("subBrokerName"));
				gridStore.add(reportMap);
			}
			gridColumns.add("Client Code");
			gridColumns.add("CostCenter Name");
			gridColumns.add("Sub Broker Name");
			responseObj.put("gridStore", gridStore);
			responseObj.put("hasMoreResults", new Boolean(hasMoreResults));
			responseObj.put("reportName", bean.getReportName());
			responseObj.put("gridColumns", gridColumns);
		} else if (bean.getReportName().equalsIgnoreCase("REP010")) {
			ArrayList gridStore = new ArrayList();
			ArrayList gridColumns = new ArrayList();
			Query query = currentsession.createSQLQuery(NEW_CUSTOMERS);
			query.setParameter("startdate", bean.getFromDate() + " 00:00:00");
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List results = query.list();
			boolean hasMoreResults = (results != null && results.size() > 0);
			for (Object object : results) {
				Map row = (Map) object;
				HashMap reportMap = new HashMap();
				reportMap.put("Client Code", row.get("clientCode"));
				reportMap.put("CostCenter Name", row.get("costCenterName"));
				reportMap.put("Sub Broker Name", row.get("subBrokerName"));
				gridStore.add(reportMap);
			}
			gridColumns.add("Client Code");
			gridColumns.add("CostCenter Name");
			gridColumns.add("Sub Broker Name");
			responseObj.put("gridStore", gridStore);
			responseObj.put("hasMoreResults", new Boolean(hasMoreResults));
			responseObj.put("reportName", bean.getReportName());
			responseObj.put("gridColumns", gridColumns);
		}
		return responseObj;
	}

	@SuppressWarnings("rawtypes")
	@Transactional
	public ArrayList getAllClientRecords() {

		ArrayList<Map> listOfClients = new ArrayList<Map>();
		Session currentsession = sessionFactory.getCurrentSession();
		Query query = currentsession.createQuery("from Client");
		// query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List results = query.list();
		System.out.println(results.size());
		for (int i = 0; i < results.size(); i++) {
			Client client = (Client) results.get(i);
			try {
				listOfClients.add(ConvertObjectToMap(client));
				System.out.println(ConvertObjectToMap(client));
			} catch (Exception e) {
				continue;
			}
		}
		return listOfClients;
	}

	public Map<String, String> ConvertObjectToMap(Object obj)
			throws IllegalAccessException, IllegalArgumentException,
			InvocationTargetException {

		java.lang.reflect.Method[] allMethods = obj.getClass().getMethods();
		Map<String, String> map = new HashMap<String, String>();
		for (java.lang.reflect.Method m : allMethods) {
			if (m.getName().startsWith("get")
					&& !m.getName().startsWith("getClass")) {
				Object value = (Object) m.invoke(obj);
				System.out.println(m.getName().substring(3));
				map.put(m.getName().substring(3), value.toString());
			}
		}
		return map;
	}

	@SuppressWarnings("rawtypes")
	public long calculateTotalVolume(List results) {
		long sumofVolume = 0;
		for (Object object : results) {
			Map row = (Map) object;

			try {
				long mp = Long.parseLong(row.get("Volume").toString());
				sumofVolume += mp;
			} catch (Exception e) {
			}
		}
		return sumofVolume;
	}
}
