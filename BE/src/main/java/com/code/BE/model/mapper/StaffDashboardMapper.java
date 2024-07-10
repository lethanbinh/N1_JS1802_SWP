package com.code.BE.model.mapper;

import com.code.BE.model.dto.StaffDashboardDailyDTO;
import com.code.BE.model.entity.StaffDashboardDaily;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StaffDashboardMapper {

    @Mapping(source = "staffDashboardDaily.staff.id", target = "staffId")
    @Mapping(source = "staffDashboardDaily.stall.id", target = "stallId")

    StaffDashboardDailyDTO toResponse(StaffDashboardDaily staffDashboardDaily);
    List<StaffDashboardDailyDTO> toResponseList(List<StaffDashboardDaily> staffDashboardDailies);

    // Map Request to Entity
    StaffDashboardDaily toEntity(StaffDashboardDailyDTO staffDashboardDailyDTO);
    List<StaffDashboardDaily> toEntityList(List<StaffDashboardDailyDTO> staffDashboardDailyDTOS);
}
