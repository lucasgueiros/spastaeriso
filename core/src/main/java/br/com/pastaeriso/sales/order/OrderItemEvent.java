package br.com.pastaeriso.sales.order;


import br.com.pastaeriso.sales.order.OrderItemStatus;
import br.com.pastaeriso.sales.delivery.DeliveryStatus;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author lucas
 */
@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemEvent {
    
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private LocalDateTime datetime;
    @Enumerated(EnumType.STRING)
    private OrderItemStatus status;
    private String comments;
    
}