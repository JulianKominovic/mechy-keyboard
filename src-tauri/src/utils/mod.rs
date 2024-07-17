use rand::Rng;

/// Get a random f32 between min and max
/// Min is inclusive, max is inclusive
pub fn get_random_f32_between(min: f32, max: f32) -> f32 {
    let mut rng = rand::thread_rng();
    rng.gen_range(min..=max)
}
