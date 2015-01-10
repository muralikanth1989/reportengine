package com.capitalfocus.reportengine.model;

public class ReporterFormBean {

	private String reportName;
	private String fromDate;
	private String toDate;
	private String reporttimeline;
	
	public ReporterFormBean() {
	}
	
	public String getReportName() {
		return reportName;
	}
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getReporttimeline() {
		return reporttimeline;
	}

	public void setReporttimeline(String reporttimeline) {
		this.reporttimeline = reporttimeline;
	}
	
}
