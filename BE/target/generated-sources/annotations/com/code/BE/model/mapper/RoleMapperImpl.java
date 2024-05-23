package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.RoleRequest;
import com.code.BE.model.dto.response.RoleResponse;
import com.code.BE.model.entity.Role;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-23T15:21:26+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class RoleMapperImpl implements RoleMapper {

    @Override
    public RoleResponse toResponse(Role user) {
        if ( user == null ) {
            return null;
        }

        RoleResponse roleResponse = new RoleResponse();

        return roleResponse;
    }

    @Override
    public List<RoleResponse> toResponseList(List<Role> roleList) {
        if ( roleList == null ) {
            return null;
        }

        List<RoleResponse> list = new ArrayList<RoleResponse>( roleList.size() );
        for ( Role role : roleList ) {
            list.add( toResponse( role ) );
        }

        return list;
    }

    @Override
    public Role toEntity(RoleRequest roleRequest) {
        if ( roleRequest == null ) {
            return null;
        }

        Role role = new Role();

        return role;
    }

    @Override
    public List<Role> toEntityList(List<RoleRequest> roleRequestList) {
        if ( roleRequestList == null ) {
            return null;
        }

        List<Role> list = new ArrayList<Role>( roleRequestList.size() );
        for ( RoleRequest roleRequest : roleRequestList ) {
            list.add( toEntity( roleRequest ) );
        }

        return list;
    }
}
