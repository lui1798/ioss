/*
 * File Name：DataSynchronismController.java
 *
 * Copyrighe：copyright@2016 www.ggkbigdata.com. All Rights Reserved
 *
 * Create Time: 2016年9月20日 下午4:36:38
 */
package com.ggk.ioss.dbsourceora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.ggk.ioss.dbsourceora.service.DataSynchronismService;
import com.ggk.ioss.dbsourceora.util.JSONConvertor;

/**
 *
 * @author lcc (lincc@ggkbigdata.com)
 * @version 1.0, 2016年9月20日 下午4:36:38
 */
@RestController
public class DataSynchronismController {
    @Autowired
    private DataSynchronismService service;
    
    private JSONConvertor convertor = new JSONConvertor();
    
    @RequestMapping(value = {"data/getTickInfo"}, method = RequestMethod.GET)
    public JSONObject getDetectionCategory(@RequestParam String date, @RequestParam long start, @RequestParam long end) {
        return convertor.convertIntoJSON(service.getTicketMainInfoFromOral(date, start, end));
    }
    
    @RequestMapping(value = {"data/getDateEventCount"}, method = RequestMethod.GET)
    public JSONObject getDateEventCount(@RequestParam String date) {
        return convertor.getDateEventCountJSON(service.getDateEventCount(date));
    }
    
    @RequestMapping(value = {"data/getHistoryData"}, method = RequestMethod.GET)
    public JSONObject getHistoryData(@RequestParam long start, @RequestParam long end) {
        return convertor.convertIntoJSON(service.getHistoryData(start, end));
    }
    
    @RequestMapping(value = {"data/getHistoryDataCount"}, method = RequestMethod.GET)
    public JSONObject getHistoryDataCount() {
        return convertor.getDateEventCountJSON(service.getHistoryDataCount());
    }
    
    @RequestMapping(value = {"data/getRealTimeData"}, method = RequestMethod.GET)
    public JSONObject getRealTimeData(@RequestParam String startDate, @RequestParam String endDate) {
        return convertor.convertIntoJSON(service.getRealTimeData(startDate, endDate));
    }
    
    @RequestMapping(value = {"data/getRealTimeOralData"}, method = RequestMethod.GET)
    public JSONObject getRealTimeOralData(@RequestParam long startTime) {
        return convertor.convertIntoJSON(service.getRealTimeOralData(startTime));
    }
    
    @RequestMapping(value = {"data/getMinUpdateTime"}, method = RequestMethod.GET)
    public JSONObject getMinUpdateTime() {
        return convertor.getDateEventCountJSON(service.getMinUpdateTime());
    }
    
    @RequestMapping(value = {"data/getMaxUpdateTime"}, method = RequestMethod.GET)
    public JSONObject getMaxUpdateTime() {
        return convertor.getDateEventCountJSON(service.getMaxUpdateTime());
    }
    
    @RequestMapping(value = {"data/getHistoryDataByUpdateTime"}, method = RequestMethod.GET)
    public JSONObject getHistoryDataByUpdateTime(@RequestParam long startTime, @RequestParam long endTime) {
        return convertor.convertIntoJSON(service.getHistoryDataByUpdateTime(startTime, endTime));
    }
}

