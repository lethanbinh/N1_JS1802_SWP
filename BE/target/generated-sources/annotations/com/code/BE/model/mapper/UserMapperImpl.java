package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.UserRequest;
import com.code.BE.model.dto.response.UserResponse;
import com.code.BE.model.entity.Role;
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
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setRoleId( userRoleId( user ) );
        userResponse.setStallId( userStallId( user ) );
        userResponse.setRoleName( userRoleName( user ) );
        userResponse.setStallName( userStallName( user ) );
        userResponse.setId( user.getId() );
        userResponse.setUsername( user.getUsername() );
        userResponse.setPassword( user.getPassword() );
        userResponse.setFullName( user.getFullName() );
        userResponse.setRegisterDate( user.getRegisterDate() );
        userResponse.setPhone( user.getPhone() );
        userResponse.setEmail( user.getEmail() );
        userResponse.setAddress( user.getAddress() );
        userResponse.setAvatar( user.getAvatar() );
        userResponse.setPointBonus( user.getPointBonus() );
        userResponse.setBirthday( user.getBirthday() );
        userResponse.setStatus( user.isStatus() );

        return userResponse;
    }

    @Override
    public List<UserResponse> toResponseList(List<User> userList) {
        if ( userList == null ) {
            return null;
        }

        List<UserResponse> list = new ArrayList<UserResponse>( userList.size() );
        for ( User user : userList ) {
            list.add( toResponse( user ) );
        }

        return list;
    }

    @Override
    public User toEntity(UserRequest userRequest) {
        if ( userRequest == null ) {
            return null;
        }

        User user = new User();

        user.setUsername( userRequest.getUsername() );
        user.setFullName( userRequest.getFullName() );
        user.setPassword( userRequest.getPassword() );
        user.setPhone( userRequest.getPhone() );
        user.setEmail( userRequest.getEmail() );
        user.setAddress( userRequest.getAddress() );
        user.setAvatar( userRequest.getAvatar() );
        user.setBirthday( userRequest.getBirthday() );
        user.setStatus( userRequest.isStatus() );

        return user;
    }

    @Override
    public List<User> toEntityList(List<UserRequest> userRequestList) {
        if ( userRequestList == null ) {
            return null;
        }

        List<User> list = new ArrayList<User>( userRequestList.size() );
        for ( UserRequest userRequest : userRequestList ) {
            list.add( toEntity( userRequest ) );
        }

        return list;
    }

    private int userRoleId(User user) {
        if ( user == null ) {
            return 0;
        }
        Role role = user.getRole();
        if ( role == null ) {
            return 0;
        }
        int id = role.getId();
        return id;
    }

    private int userStallId(User user) {
        if ( user == null ) {
            return 0;
        }
        Stall stall = user.getStall();
        if ( stall == null ) {
            return 0;
        }
        int id = stall.getId();
        return id;
    }

    private String userRoleName(User user) {
        if ( user == null ) {
            return null;
        }
        Role role = user.getRole();
        if ( role == null ) {
            return null;
        }
        String name = role.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String userStallName(User user) {
        if ( user == null ) {
            return null;
        }
        Stall stall = user.getStall();
        if ( stall == null ) {
            return null;
        }
        String name = stall.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }
}
