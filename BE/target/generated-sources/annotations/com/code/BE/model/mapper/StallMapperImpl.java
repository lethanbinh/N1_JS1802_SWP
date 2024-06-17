package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.StallResponse;
import com.code.BE.model.entity.Stall;
import com.code.BE.model.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-17T10:41:50+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class StallMapperImpl implements StallMapper {

    @Override
    public StallResponse toResponse(Stall stall) {
        if ( stall == null ) {
            return null;
        }

        StallResponse stallResponse = new StallResponse();

        stallResponse.setStaffId( stallStaffId( stall ) );
        stallResponse.setId( stall.getId() );
        stallResponse.setCode( stall.getCode() );
        stallResponse.setName( stall.getName() );
        stallResponse.setType( stall.getType() );
        stallResponse.setDescription( stall.getDescription() );
        stallResponse.setStatus( stall.isStatus() );

        return stallResponse;
    }

    @Override
    public List<StallResponse> toResponseList(List<Stall> stallList) {
        if ( stallList == null ) {
            return null;
        }

        List<StallResponse> list = new ArrayList<StallResponse>( stallList.size() );
        for ( Stall stall : stallList ) {
            list.add( toResponse( stall ) );
        }

        return list;
    }

    @Override
    public Stall toEntity(StallRequest stallRequest) {
        if ( stallRequest == null ) {
            return null;
        }

        Stall stall = new Stall();

        stall.setCode( stallRequest.getCode() );
        stall.setName( stallRequest.getName() );
        stall.setType( stallRequest.getType() );
        stall.setDescription( stallRequest.getDescription() );
        stall.setStatus( stallRequest.isStatus() );

        return stall;
    }

    @Override
    public List<Stall> toEntityList(List<StallRequest> stallRequestList) {
        if ( stallRequestList == null ) {
            return null;
        }

        List<Stall> list = new ArrayList<Stall>( stallRequestList.size() );
        for ( StallRequest stallRequest : stallRequestList ) {
            list.add( toEntity( stallRequest ) );
        }

        return list;
    }

    private int stallStaffId(Stall stall) {
        if ( stall == null ) {
            return 0;
        }
        User staff = stall.getStaff();
        if ( staff == null ) {
            return 0;
        }
        int id = staff.getId();
        return id;
    }
}
