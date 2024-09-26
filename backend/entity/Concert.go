package entity

import (
   "gorm.io/gorm"
    "time"
)
type Concert struct {
    gorm.Model
    Name        string
    Date        time.Time
    Venue       string
    Seats       []Seat
}