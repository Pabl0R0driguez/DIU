package com.example.tutorials.controller.impl;

import com.example.tutorials.controller.TutorialsAPI;
import com.example.tutorials.model.TutorialsDto;
import com.example.tutorials.service.TutorialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TutorialsController implements TutorialsAPI {
    @Autowired
    private TutorialsService tutorialsService;
    //@Autowired //private TutorialsRepository tutorialsRepository; @Override
    @GetMapping("/tutorials")
    public List<TutorialsDto> getAllTutorials(){return tutorialsService.getAllTutorials();
    }
    @Override
    @CrossOrigin //F!* CORS@PostMapping("/tutorials")
    public TutorialsDto save(@RequestBody TutorialsDto tutorialDto) {
        return tutorialsService.save(tutorialDto);
    }
}