package com.code.BE.service.internal.dashboardService;

import com.code.BE.model.dto.StaffDashboardDailyDTO;
import com.code.BE.model.entity.StaffDashboardDaily;
import com.code.BE.model.mapper.StaffDashboardMapper;
import com.code.BE.repository.StaffDashboardDailyRepository;
import com.code.BE.repository.StallRepository;
import com.code.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {
    @Autowired
    private StaffDashboardDailyRepository staffDashboardDailyRepository;

    @Autowired
    private StaffDashboardMapper staffDashboardMapper;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<StaffDashboardDailyDTO> getStaffDashboardData(int stallId, Date date) {
        return staffDashboardDailyRepository.getStaffDashboardDailyData(stallId, date);
    }

    @Override
    public List<StaffDashboardDailyDTO> getManagerDashboard(int stallId, Date startDate, Date endDate) {
        return staffDashboardDailyRepository.getManagerDashboard(stallId, startDate, endDate);
    }

    @Override
    public StaffDashboardDailyDTO save(StaffDashboardDailyDTO staffDashboardDailyDTO) {
        StaffDashboardDaily staffDashboardDaily = staffDashboardMapper.toEntity(staffDashboardDailyDTO);
        staffDashboardDaily.setStaff(userRepository.findById(staffDashboardDailyDTO.getStaffId()));
        staffDashboardDaily.setStall(stallRepository.findById(staffDashboardDailyDTO.getStallId()));

        return staffDashboardMapper.toResponse(
                staffDashboardDailyRepository.save(staffDashboardDaily));
    }

    @Override
    public List<StaffDashboardDailyDTO> findByStaffId(int id) {
        return staffDashboardMapper.toResponseList(staffDashboardDailyRepository.findByStaffId(id));
    }

    @Override
    public List<StaffDashboardDailyDTO> findByStallId(int id) {
        return staffDashboardMapper.toResponseList(staffDashboardDailyRepository.findByStallId(id));
    }
}
