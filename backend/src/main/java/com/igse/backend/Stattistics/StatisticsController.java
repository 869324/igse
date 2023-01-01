package com.igse.backend.Stattistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("statistics")
@ResponseBody
public class StatisticsController {
    @Autowired StatisticsService statisticsService;

    @GetMapping(value="getStats")
    public Object getStats() {
        return statisticsService.getStats();
    }
}
