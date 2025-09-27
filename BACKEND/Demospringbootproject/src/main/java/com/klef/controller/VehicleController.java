package com.klef.controller;

import com.klef.model.Vehicle;
import com.klef.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @GetMapping
    public List<Vehicle> getVehicles() {
        return vehicleService.getAllVehicles();
    }

    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
    }

    // ✅ Edit (Update) Vehicle
    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        vehicle.setId(id); // ensure path id is used
        return vehicleService.saveVehicle(vehicle);
    }
}







//package com.klef.controller;
//
//import com.klef.model.Vehicle;
//import com.klef.service.VehicleService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/vehicles")
// 
//@CrossOrigin(origins = "*")
//
//
//public class VehicleController {
//
//    private final VehicleService vehicleService;
//
//    public VehicleController(VehicleService vehicleService) {
//        this.vehicleService = vehicleService;
//    }
//
//    @PostMapping
//    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
//        return vehicleService.saveVehicle(vehicle);
//    }
//
//    @GetMapping
//    public List<Vehicle> getVehicles() {
//        return vehicleService.getAllVehicles();
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteVehicle(@PathVariable Long id) {
//        vehicleService.deleteVehicle(id);
//    }
//   
//
//    }
//
