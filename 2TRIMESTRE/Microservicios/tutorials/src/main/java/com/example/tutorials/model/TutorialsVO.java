package com.example.tutorials.model;

import lombok.Getter;
import lombok.Builder;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

    @Getter
    @Setter
    @Builder
    @Document

public class TutorialsVO {
    @Id
    private String id;
    private String title;
    private String description;
    private Boolean published;

}
