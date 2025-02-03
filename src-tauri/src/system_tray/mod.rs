use log::trace;
use tauri::api::shell::{open, Program};
use tauri::Manager;
use tauri::{AppHandle, SystemTray, SystemTrayEvent};
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};

use crate::constants::GH_RELEASES_URL;

const QUIT_ID: &str = "quit";
const HIDE_SHOW_ID: &str = "hide-show";
const VERSION_ID: &str = "version";

pub fn build_system_tray() -> SystemTray {
    let hide = CustomMenuItem::new(HIDE_SHOW_ID.to_string(), "Hide").accelerator("CmdOrCtrl+H");
    let quit = CustomMenuItem::new(QUIT_ID.to_string(), "Quit").accelerator("CmdOrCtrl+Q");
    let version = CustomMenuItem::new(VERSION_ID.to_string(), "Getting version...");
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(version);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    system_tray
}

pub fn build_system_tray_events(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            trace!("system tray received a left click");
            if app.get_window("main").unwrap().is_visible().unwrap() {
                app.tray_handle()
                    .get_item(HIDE_SHOW_ID)
                    .set_title("Hide")
                    .unwrap();
            } else {
                app.tray_handle()
                    .get_item(HIDE_SHOW_ID)
                    .set_title("Show")
                    .unwrap();
            }
            app.tray_handle()
                .get_item(VERSION_ID)
                .set_title(format!(
                    "Version: {}",
                    app.package_info().version.to_string()
                ))
                .unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            VERSION_ID => {
                // Open link
                open(&app.shell_scope(), GH_RELEASES_URL, None).unwrap();
            }
            QUIT_ID => {
                app.exit(0);
            }
            HIDE_SHOW_ID => {
                let window = app.get_window("main").unwrap();
                if window.is_visible().unwrap() {
                    window.hide().unwrap();
                } else {
                    window.show().unwrap();
                    window.center().unwrap();
                    window.set_focus().unwrap();
                }
            }
            _ => {}
        },
        _ => {}
    }
}
