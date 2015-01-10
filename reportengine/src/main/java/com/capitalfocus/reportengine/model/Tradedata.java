package com.capitalfocus.reportengine.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TRADE_DATA")
public class Tradedata {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "TRADE_ID")
	long tradeId;
	@Column(name = "TRADE_NUMBER")
	private int tradeNumber;
	@Column(name = "SYMBOL", nullable = false)
	private String symbol;
	@Column(name = "TRADE_QUANTITY", nullable = false)
	private int tradeQnty;
	@Column(name = "PRICE", nullable = false)
	private int price;
	@Column(name = "PARTICIPANT_SETTLER", nullable = false)
	private String participantSettler;
	@Column(name = "TM_ID", nullable = false)
	private int TMid;
	@Column(name = "DATETIME", nullable = false)
	private Date tradeDate;

	public Tradedata() {

	}

	public long getTradeId() {
		return tradeId;
	}

	public void setTradeId(long tradeId) {
		this.tradeId = tradeId;
	}
	
	public int getTradeNumber() {
		return tradeNumber;
	}

	public void setTradeNumber(int tradeNumber) {
		this.tradeNumber = tradeNumber;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public int getTradeQnty() {
		return tradeQnty;
	}

	public void setTradeQnty(int tradeQnty) {
		this.tradeQnty = tradeQnty;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getParticipantSettler() {
		return participantSettler;
	}

	public void setParticipantSettler(String participantSettler) {
		this.participantSettler = participantSettler;
	}

	public int getTMid() {
		return TMid;
	}

	public void setTMid(int tMid) {
		TMid = tMid;
	}

	public Date getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(Date tradeDate) {
		this.tradeDate = tradeDate;
	}

}
