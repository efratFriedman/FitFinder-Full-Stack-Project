package com.example.fs_project.security.jwt;

import com.example.fs_project.security.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//********תפקיד המחלקה:
//
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CustomUserDetailsService userDetailsService;


//********תפקיד הפונקציה:

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        {
            try{
                String jwt=jwtUtils.getJwtFromCookies(request);
                //*********מהי השאלה כאן???
                if(jwt !=null && jwtUtils.validateJwtToken(jwt)){
                    String userName=jwtUtils.getUserNameFromJwtToken(jwt);
                    UserDetails userDetails= userDetailsService.loadUserByUsername(userName);

                    UsernamePasswordAuthenticationToken authentication=
                            new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                }

            }
            catch (Exception e)
            {
                System.out.println(e);
            }
            //***************מה משמעות ה-filter??
            filterChain.doFilter(request,response);
        }
    }
}
