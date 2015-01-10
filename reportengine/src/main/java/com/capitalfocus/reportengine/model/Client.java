package com.capitalfocus.reportengine.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CLIENT_TABLE")
public class Client {

	@Id
	String clientCode;
	@Column(nullable = false)
	String clientName;
	@Column(nullable = false)
	String costCenterCode;
	@Column(nullable = false)
	String costCenterName;
	@Column(nullable = true)
	String introBy;
	@Column(nullable = true)
	String subBrokerName;
	@Column(nullable = false)
	String panNo;
	@Column(nullable = false)
	String mobileNumber;
	@Column(nullable = false)
	String emailID;
	@Column(nullable = false)
	String schemeCode;
	@Column(nullable = false)
	String schemeName;
	@Column(nullable = false)
	Date dateOfJoin;

	public Client() {
		super();
	}

	public void setClientCode(String clientCode) {
		this.clientCode = clientCode;
	}

	public void setCostCenterCode(String costCenterCode) {
		this.costCenterCode = costCenterCode;
	}

	public void setCostCenterName(String costCenterName) {
		this.costCenterName = costCenterName;
	}

	public void setSubBrokerName(String subBrokerName) {
		this.subBrokerName = subBrokerName;
	}

	public void setPanNo(String panNo) {
		this.panNo = panNo;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public void setEmailID(String emailID) {
		this.emailID = emailID;
	}

	public void setSchemeCode(String schemeCode) {
		this.schemeCode = schemeCode;
	}

	public void setSchemeName(String schemeName) {
		this.schemeName = schemeName;
	}

	public void setDateOfJoin(Date dateOfJoin) {
		this.dateOfJoin = dateOfJoin;
	}

	public String getIntroBy() {
		return introBy;
	}

	public void setIntroBy(String introBy) {
		this.introBy = introBy;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	
	public String getClientCode() {
		return clientCode;
	}

	public String getCostCenterCode() {
		return costCenterCode;
	}

	public String getCostCenterName() {
		return costCenterName;
	}

	public String getSubBrokerName() {
		return subBrokerName;
	}

	public String getPanNo() {
		return panNo;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public String getEmailID() {
		return emailID;
	}

	public String getSchemeCode() {
		return schemeCode;
	}

	public String getSchemeName() {
		return schemeName;
	}

	public Date getDateOfJoin() {
		return dateOfJoin;
	}

	@Override
	public String toString() {
		return "Client [clientCode=" + clientCode + ", clientName="
				+ clientName + ", costCenterCode=" + costCenterCode
				+ ", costCenterName=" + costCenterName + ", introBy=" + introBy
				+ ", subBrokerName=" + subBrokerName + ", panNo=" + panNo
				+ ", mobileNumber=" + mobileNumber + ", emailID=" + emailID
				+ ", schemeCode=" + schemeCode + ", schemeName=" + schemeName
				+ ", dateOfJoin=" + dateOfJoin + "]";
	}
	
}
