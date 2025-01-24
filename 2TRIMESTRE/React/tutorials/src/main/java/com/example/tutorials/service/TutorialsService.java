package com.example.tutorials.service;

import com.example.tutorials.model.TutorialsDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface TutorialsService {
    List<TutorialsDto> getAllTutorials();
    //Optional<TutorialsDto> getTutorialById(String id);
 //   List<TutorialsDto> findByTitleContaining(String title);
//    List<TutorialsDto> findByPublished();
    TutorialsDto save(TutorialsDto tutorial);
 //   TutorialsDto updateTutorial(TutorialsDto tutorial);
    //ResponseEntity deleteTutorial(String id);
  //  ResponseEntity deleteAllTutorials();
    }