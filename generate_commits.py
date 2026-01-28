import os
import random
import subprocess
import time

# Configuration
target_dir = "src/generated"
total_commits = 200000

# Templates
component_template = """
import React, { useState } from 'react';

interface PREFIX_NAMEProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  // PROPS_PLACEHOLDER
}

export const PREFIX_NAME: React.FC<PREFIX_NAMEProps> = ({ id, className, children, ...props }) => {
  const [isActive, setIsActive] = useState(false);

  // HOOKS_PLACEHOLDER

  return (
    <div id={id} className={`p-4 rounded-lg ${isActive ? 'bg-blue-100' : 'bg-white'} ${className}`} {...props}>
      <h3 className="text-lg font-bold mb-2">PREFIX_NAME Component</h3>
      {children}
      <button 
        onClick={() => setIsActive(!isActive)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Toggle State
      </button>
      {/* JSX_PLACEHOLDER */}
    </div>
  );
};
"""

util_template = """
/**
 * Utility function for PREFIX_NAME operations
 */
export const PREFIX_NAME = (input: any): any => {
  // LOGIC_PLACEHOLDER
  try {
    const timestamp = Date.now();
    console.log(`[PREFIX_NAME] Executed at ${timestamp}`);
    return input;
  } catch (error) {
    console.error(`[PREFIX_NAME] Error:`, error);
    throw error;
  }
};
"""

# Word options for generation
prefixes = ["User", "Admin", "Dashboard", "Settings", "Profile", "Auth", "Table", "Chart", "Modal", "Button"]
middles = ["Data", "View", "List", "Card", "Container", "Wrapper", "Input", "Select", "Toggle", "Link"]
suffixes = ["box", "Item", "Group", "Panel", "Section", "Row", "Grid", "Header", "Footer", "Sidebar"]

actions = ["add", "update", "fix", "refactor", "style", "perf", "test", "docs"]
features = ["accessibility", "responsive-design", "dark-mode", "state-management", "error-handling", "validation", "animation", "caching", "logging", "security"]

def get_random_name():
    return f"{random.choice(prefixes)}{random.choice(middles)}{random.choice(suffixes)}"

def create_component(name):
    content = component_template.replace("PREFIX_NAME", name)
    path = os.path.join(target_dir, "ui", f"{name}.tsx")
    with open(path, "w") as f:
        f.write(content)
    return path

def create_util(name):
    content = util_template.replace("PREFIX_NAME", name)
    path = os.path.join(target_dir, "utils", f"{name}.ts")
    with open(path, "w") as f:
        f.write(content)
    return path

def update_file(path):
    with open(path, "r") as f:
        content = f.read()
    
    # Simple modification updates
    if "PROPS_PLACEHOLDER" in content:
        new_prop = f"prop_{random.randint(100, 999)}?: string;"
        content = content.replace("// PROPS_PLACEHOLDER", f"{new_prop}\n  // PROPS_PLACEHOLDER")
        msg_type = "feat"
        msg_desc = "add new prop interface"
    elif "JSX_PLACEHOLDER" in content:
        new_jsx = f'<div className="mt-2 text-sm text-gray-500">Updated: {random.randint(1000, 9999)}</div>'
        content = content.replace("{/* JSX_PLACEHOLDER */}", f"{new_jsx}\n      {{/* JSX_PLACEHOLDER */}}")
        msg_type = "style"
        msg_desc = "update component layout"
    elif "LOGIC_PLACEHOLDER" in content:
        new_logic = f"// Processed step {random.randint(1, 100)}"
        content = content.replace("// LOGIC_PLACEHOLDER", f"{new_logic}\n  // LOGIC_PLACEHOLDER")
        msg_type = "refactor"
        msg_desc = "optimize utility logic"
    else:
        # Fallback append
        content += f"\n// Reviewed by automated bot {random.randint(1000, 9999)}"
        msg_type = "chore"
        msg_desc = "maintenance update"
        
    with open(path, "w") as f:
        f.write(content)
    
    return msg_type, msg_desc

def run_git_commands(msg):
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", msg], check=True)

existing_files = []

# Main Loop
print(f"Starting generation of {total_commits} commits...")

for i in range(1, total_commits + 1):
    action_type = random.random()
    
    msg_prefix = ""
    msg_body = ""
    
    # 20% Change of creating a new file
    if action_type < 0.20 or not existing_files:
        name = get_random_name()
        # 50/50 split between UI and Utils
        if random.random() < 0.5:
            path = create_component(name)
            msg_prefix = "feat(ui)"
        else:
            path = create_util(name)
            msg_prefix = "feat(utils)"
        
        existing_files.append(path)
        msg_body = f"create new {name} module"
        
    # 80% Chance of updating an existing file
    else:
        path = random.choice(existing_files)
        # Ensure file exists (it should)
        if not os.path.exists(path):
            existing_files.remove(path)
            continue
            
        type_str, desc = update_file(path)
        
        # Determine scope from path
        scope = "ui" if "/ui/" in path else "utils"
        
        msg_prefix = f"{type_str}({scope})"
        msg_body = f"{desc} in {os.path.basename(path)}"

    # Construct message
    full_msg = f"{msg_prefix}: {msg_body}"
    
    try:
        run_git_commands(full_msg)
        if i % 100 == 0:
            print(f"Committed {i}/{total_commits}: {full_msg}")
    except subprocess.CalledProcessError:
        # If git commit fails (e.g. no changes), just continue
        # Force a change to ensure progress next time? 
        # For now, simplistic error handling
        pass
        
print("Done!")
