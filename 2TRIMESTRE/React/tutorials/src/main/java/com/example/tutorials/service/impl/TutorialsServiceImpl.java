package com.example.tutorials.service.impl;




import com.example.tutorials.model.TutorialsDto;
import com.example.tutorials.model.TutorialsVO;
import com.example.tutorials.repository.TutorialsRepository;
import com.example.tutorials.service.TutorialsService;
import com.example.tutorials.util.TutorialsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TutorialsServiceImpl implements TutorialsService {
    @Autowired
    private TutorialsRepository tutorialsRepository;

    @Override
    public List<TutorialsDto> getAllTutorials() {
        List<TutorialsVO> tutorialsVOList = tutorialsRepository.findAll();
        return tutorialsVOList.stream()
                .map(TutorialsMapper::tutorialsMapperEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public TutorialsDto save(TutorialsDto tutorialDto) {
        TutorialsVO tutorialsVO = TutorialsMapper.tutorialsMapperDtoToEntity(tutorialDto);
        TutorialsVO savedTutorialEntity = (TutorialsVO) tutorialsRepository.save(tutorialsVO);
        return TutorialsMapper.tutorialsMapperEntityToDto(savedTutorialEntity);
    }
}