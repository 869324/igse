package com.igse.backend.Reading;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("reading")
@ResponseBody
public class ReadingController {
    @Autowired
    ReadingService readingService;


    @PostMapping(value = "/")
    public Object create(@RequestBody Reading reading)  {
        readingService.createReading(reading);
        return null;
    }

}
