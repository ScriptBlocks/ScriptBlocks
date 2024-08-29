!define MUI_LANGUAGE "English"
!include "MUI2.nsh"

; Define the Python installation path
!define PYTHON_INSTALLER "${APPDATA}\\ScriptBlocks\\python-installer.exe"

Section "Install Python"

    ; Check if Python is already installed
    ReadRegStr $0 HKCU "Software\Python\PythonCore\3.11" "InstallPath"
    StrCmp $0 "" 0 +2
    ; If Python is not installed, run the installer
    ExecWait '"$PYTHON_INSTALLER" /quiet InstallAllUsers=1 PrependPath=1'

SectionEnd
