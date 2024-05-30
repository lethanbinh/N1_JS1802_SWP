package com.code.BE.service.external.dateService;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.exception.ValidationException;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class DateConvertServiceImpl implements DateConvertService{
    @Override
    public Date convertToDate(String dateStr) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        try {
            return formatter.parse(dateStr);
        } catch (ParseException e) {
            throw new ValidationException(ErrorMessage.DATE_VALIDATION_FAILED);
        }
    }
}
