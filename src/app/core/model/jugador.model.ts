export interface Jugador {
    id: number,
    fifa_version: string,
	fifa_update: string,
    player_face_url: string,
	long_name: string,	
    player_positions: string,
    club_name: string,	
    nationality_name: string,
    overall: number,
    potential: number,
  	value_eur: number,
    wage_eur: number,
    age: number,
    gender: string,
    height_cm: number,
    weight_kg: number,
    preferred_foot: string,
    weak_foot: number,
    skill_moves: number,
    international_reputation: number,
    work_rate: string,
    body_type: string,
    pace: number,
    shooting: number,
    passing: number,
    dribbling: number,
    defending: number,
    physic: number,
    attacking_crossing: number,
    attacking_finishing: number,
    attacking_heading_accuracy: number,
	attacking_short_passing: number,
    attacking_volleys: number,
    skill_dribbling: number,
    skill_curve: number,
    skill_fk_accuracy: number,
    skill_long_passing: number,
    skill_ball_control: number,
    movement_acceleration: number,
    movement_sprint_speed: number,
    movement_agility: number,
    movement_reactions: number,
    movement_balance: number,
    power_shot_power: number,
	power_jumping: number,
    power_stamina: number,
    power_strength: number,
    power_long_shots: number,
    mentality_aggression: number,
    mentality_interceptions: number,
    mentality_positioning: number,
    mentality_vision: number,
    mentality_penalties: number,
    mentality_composure: number,
    defending_marking: number,
    defending_standing_tackle: number,
    defending_sliding_tackle: number,
    goalkeeping_diving: number,
    goalkeeping_handling: number,
    goalkeeping_kicking: number,
    goalkeeping_positioning: number,
    goalkeeping_reflexes: number,
    goalkeeping_speed: number,
    player_traits: string
}