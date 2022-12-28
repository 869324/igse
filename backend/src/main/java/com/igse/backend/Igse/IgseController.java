package com.igse.backend.Igse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("igse")
@ResponseBody
public class IgseController {
    @Autowired
    IgseService igseService;

    @GetMapping("/propertyCount")
    public Object getPropertyCount() {
        return igseService.getPropertyCount();
    }

    @GetMapping("/{propertyType}/{numOfBedrooms}")
    public Object getStats(@PathVariable(value = "propertyType") String propertyType,
                           @PathVariable(value = "numOfBedrooms") String numOfBedrooms) {
        return igseService.getStats(propertyType, Integer.valueOf(numOfBedrooms));
    }
}
