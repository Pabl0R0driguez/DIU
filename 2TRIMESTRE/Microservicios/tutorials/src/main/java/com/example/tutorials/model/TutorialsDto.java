package com.example.tutorials.model;

// Normal

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Builder
public class TutorialsDto {

    private String id;
    private String title;
    private String description;
    private Boolean published;

}
