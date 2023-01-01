package com.igse.backend.Reading;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("readings")
@ResponseBody
public class ReadingController {
    @Autowired
    ReadingService readingService;


    @PostMapping(value = "/create")
    public Object create(@RequestBody Reading reading)  {
        readingService.createReading(reading);
        return null;
    }

    @GetMapping(value = "getUserReadings/{userId}")
    public Object getUserReadings(@PathVariable(value = "userId") String userId){
        return readingService.getUserReadings(Integer.parseInt(userId));
    }

}
