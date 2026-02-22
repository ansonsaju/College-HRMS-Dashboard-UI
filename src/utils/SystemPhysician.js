export const SystemPhysician = {
    /**
     * Diagnostic Check: Audits localStorage for HRMS state integrity.
     */
    diagnose: () => {
        const diagnostics = {
            auth: true,
            employees: true,
            corruptedKeys: []
        };

        try {
            const authData = localStorage.getItem('hrms_user');
            if (authData) JSON.parse(authData);
        } catch (e) {
            diagnostics.auth = false;
            diagnostics.corruptedKeys.push('hrms_user');
        }

        return diagnostics;
    },

    /**
     * Treatment Phase: Repairs detected corruption.
     */
    treat: (diagnostics) => {
        if (!diagnostics.auth) {
            console.warn("Self-Heal: Repairing Auth Node...");
            localStorage.removeItem('hrms_user');
        }

        diagnostics.corruptedKeys.forEach(key => {
            localStorage.removeItem(key);
        });

        return true;
    },

    /**
     * Emergency Recovery: Attempts to fix app-level exceptions.
     */
    emergencyRecovery: () => {
        console.warn("SystemPhysician: Initiating Emergency Protocol...");

        // Clear potential toxic state
        const keysToClear = ['hrms_user'];
        keysToClear.forEach(k => localStorage.removeItem(k));

        // Force clean redirect to root
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        } else {
            window.location.reload();
        }
    }
};
